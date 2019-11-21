import FlowchartHandler from 'flowchartHandler';
import * as gf from '../types/flowcharting';

import FlowChartingPlugin from 'plugin';
declare var GFP: FlowChartingPlugin;

export class FlowchartOptionsCtrl {
  $scope: gf.TIFlowchartOptionsScope;
  ctrl: any; //TODO: redefine any
  flowchartHandler: FlowchartHandler;
  panel: any;
  sourceTypes: gf.TSelectSource[] = [{ text: 'XML Content', value: 'xml' }];
  themes: gf.TSelectString[] = [
    { text: 'Dark', value: 'dark' },
    { text: 'Light', value: 'kennedy' },
    { text: 'Mobile', value: 'minimal' },
    { text: 'Atlas', value: 'atlas' },
  ];
  /* @ngInject */
  constructor($scope: gf.TIFlowchartOptionsScope) {
    $scope.editor = this;
    $scope.GFP = GFP;
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.panel = this.ctrl.panel;
  }

  /**
   * Render
   *
   * @memberof FlowchartOptionsCtrl
   */
  render() {
    this.flowchartHandler.render();
  }

  /**
   * onSourceChange event when source changes
   *
   * @memberof FlowchartOptionsCtrl
   */
  onSourceChange() {
    this.flowchartHandler.sourceChanged();
    this.render();
  }

  /**
   * onOptionChange event when options change
   *
   * @memberof FlowchartOptionsCtrl
   */
  onOptionChange() {
    GFP.log.info('FlowchartOptionsCtrl.onOptionChange()');
    this.flowchartHandler.optionChanged();
    this.render();
  }

  /**
   * Open graph in index in draw.io
   *
   * @param {Number} name - index of graph
   * @memberof FlowchartOptionsCtrl
   * @see flowchartHandler:openDrawEditor
   */
  edit(name: string) {
    this.flowchartHandler.openDrawEditor(name);
  }

  getFlowcharts() {
    return this.flowchartHandler.getFlowcharts();
  }
}

/** @ngInject */
export function flowchartOptionsTab($q, $sce, uiSegmentSrv) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${GFP.getPartialPath()}/flowchart_options.html`,
    controller: FlowchartOptionsCtrl,
  };
}
