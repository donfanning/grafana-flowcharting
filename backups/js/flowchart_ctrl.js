import FlowChartingPlugin from './plugin';
import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import TimeSeries from 'grafana/app/core/time_series2';
import kbn from 'grafana/app/core/utils/kbn';
import { mappingOptionsTab } from './mapping_options';
import { flowchartOptionsTab } from './flowchart_options';
import { inspectOptionsTab } from './inspect_options';
import RulesHandler from './rulesHandler';
import FlowchartHandler from './flowchartHandler';

class FlowchartCtrl extends MetricsPanelCtrl {
  /** @ngInject **/
  constructor($scope, $injector, $rootScope, templateSrv) {
    super($scope, $injector);
    FlowChartingPlugin.init($scope,templateSrv);
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.version = GFP.getVersion();
    this.templateSrv = templateSrv;
    this.unitFormats = kbn.getUnitFormats();
    this.changedSource = true;
    this.changedData = true;
    this.changedOptions = true;
    this.rulesHandler = undefined;
    this.flowchartHandler = undefined;
    this.series = [];
    this.panelDefaults = {
      newFlag: true,
      format: 'short',
      valueName: 'current',
      rulesData: [],
      flowchartsData: [],
    };

    _.defaults(this.panel, this.panelDefaults);
    this.panel.graphId = `flowchart_${this.panel.id}`;
    this.containerDivId = `container_${this.panel.graphId}`;

    // events
    this.events.on('render', this.onRender.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('init-panel-actions', this.onInitPanelActions.bind(this));
    this.events.on('template-variable-value-updated', this.onVarChanged.bind(this));
    this.dashboard.events.on('template-variable-value-updated', this.onVarChanged.bind(this), $scope);
    if($scope.$root.onAppEvent) $scope.$root.onAppEvent('template-variable-value-updated', this.onVarChanged.bind(this), $scope);
  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    this.addEditorTab('Flowchart', flowchartOptionsTab, 2);
    this.addEditorTab('Mapping', mappingOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
  }

  onRefresh() {
    GFP.log.info( 'FlowchartCtrl.onRefresh()');
    this.onRender();
  }

  onVarChanged() {
    GFP.log.info( 'FlowchartCtrl.onVarChanged()');
    this.flowchartHandler.sourceChanged();
    this.flowchartHandler.render();
  }

  onRender() {
    GFP.log.info( 'FlowchartCtrl.onRender()');
  }

  onDataReceived(dataList) {
    GFP.log.info( 'FlowchartCtrl.onDataReceived()');
    GFP.log.debug( 'FlowchartCtrl.onDataReceived() dataList', dataList);
    this.series = dataList.map(this.seriesHandler.bind(this));
    GFP.log.debug( 'FlowchartCtrl.onDataReceived() this.series', dataList);
    this.flowchartHandler.dataChanged();
    this.render();
  }

  onDataError() {
    this.series = [];
    this.render();
  }

  onInitPanelActions(actions) {
    actions.push({
      text: 'Export SVG',
      click: 'ctrl.exportSVG()',
    });
  }

  //
  // FUNCTIONS
  //
  link(scope, elem, attrs, ctrl) {
    GFP.log.info( 'FlowchartCtrl.link()');
    GFP.perf.start(`${this.constructor.name}.link()`);

    // RULES
    const newRulesData = [];
    this.rulesHandler = new RulesHandler(scope, newRulesData);
    if (this.panel.version === undefined && this.panel.styles !== undefined) {
      this.rulesHandler.import(this.panel.styles);
      delete this.panel.styles;
    } else this.rulesHandler.import(this.panel.rulesData);
    if (this.panel.newFlag && this.rulesHandler.countRules() === 0) this.rulesHandler.addRule('.*');
    this.panel.rulesData = newRulesData;

    // FLOWCHART
    const newFlowchartsData = [];
    this.flowchartHandler = new FlowchartHandler(scope, elem, ctrl, newFlowchartsData);
    if (this.panel.version === undefined && this.panel.flowchart !== undefined) {
      this.flowchartHandler.import([this.panel.flowchart]);
      delete this.panel.flowchart;
    } else this.flowchartHandler.import(this.panel.flowchartsData);
    if (this.panel.newFlag && this.flowchartHandler.countFlowcharts() === 0) this.flowchartHandler.addFlowchart('Main');
    this.panel.flowchartsData = newFlowchartsData;

    // Versions
    this.panel.newFlag = false;
    this.panel.version = this.version;
    GFP.perf.stop(`${this.constructor.name}.link()`);
  }

  exportSVG() {
    const scope = this.$scope.$new(true);
    scope.panel = 'table';
    this.publishAppEvent('show-modal', {
      templateHtml: '<export-data-modal panel="panel" data="tableData"></export-data-modal>',
      scope,
      modalClass: 'modal--narrow',
    });
  }

  setUnitFormat(subItem) {
    this.panel.format = subItem.value;
    this.refresh();
  }

  getVariables() {
    if (this.templateSrv !== undefined && this.templateSrv !== null) {
      return _.map(this.templateSrv.variables, variable => `\${${variable.name}}`);
    }
    return null;
  }

  //
  // Series
  //

  seriesHandler(seriesData) {
    GFP.log.info( 'FlowchartCtrl.seriesHandler()');
    const series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target,
      unit: seriesData.unit,
    });
    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    const datapoints = seriesData.datapoints || [];
    if (datapoints && datapoints.length > 0) {
      const last = datapoints[datapoints.length - 1][1];
      const from = this.range.from;
      if (last - from < -10000) {
        series.isOutsideRange = true;
      }
    }
    return series;
  }
}

export { FlowchartCtrl, FlowchartCtrl as MetricsPanelCtrl };

FlowchartCtrl.templateUrl = './partials/module.html';