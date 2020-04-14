export class GFCONSTANT {
  // CONDITIONS
  static TOOLTIP_APPLYON: gf.TTooltipOnList = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  static COLOR_APPLYON: gf.TColorOnList = [
    { text: 'Never', value: 'n' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  static TEXT_APPLYON: gf.TTextOnList = [
    { text: 'Never', value: 'n' },
    { text: 'When Metric Displayed', value: 'wmd' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Critical Only', value: 'co' },
  ];
  static LINK_APPLYON: gf.TLinkOnList = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];

  // TYPES
  static VALUE_TYPES: gf.TValueTypeList = [
    { text: 'Number', value: 'number' },
    { text: 'String', value: 'string' },
    { text: 'Date', value: 'date' },
  ];
  static METRIC_TYPES: gf.TMetricTypeList = [
    { text: 'Series', value: 'serie' },
    { text: 'Table', value: 'table' },
  ];
  static IDENT_TYPES: { text: string; value: gf.TPropertieKey }[] = [
    { text: 'Id', value: 'id' },
    { text: 'Label', value: 'value' },
  ];
  static AGGREGATION_TYPES: gf.TAggregationList = [
    { text: 'First', value: 'first' },
    { text: 'Last', value: 'current' },
    { text: 'Min', value: 'min' },
    { text: 'Max', value: 'max' },
    { text: 'Sum', value: 'total' },
    { text: 'Avg', value: 'avg' },
    { text: 'Count', value: 'count' },
    { text: 'Delta', value: 'delta' },
    { text: 'Range', value: 'range' },
    { text: 'Diff', value: 'diff' },
  ];
  static TOOLTIP_GRAPH_TYPES: gf.TGraphTypeList = [
    { text: 'Line', value: 'line' },
    { text: 'Histogram', value: 'bar' },
  ];
  static TOOLTIP_GRAPH_SCALE_TYPES: gf.TGraphScaleList = [
    { text: 'Linear', value: 'linear' },
    { text: 'Logarithmic', value: 'log' },
  ];
  static TOOLTIP_GRAPH_SIZE_TYPES: gf.TGraphSizeList = [
    { text: 'Adjustable', value: '100%' },
    { text: 'Small', value: '100px' },
    { text: 'Medium', value: '200px' },
    { text: 'Large', value: '400px' },
  ];
  static TOOLTIP_DIRECTION_TYPES: gf.TDirectionList = [
    { text: 'Vertical', value: 'v' },
    { text: 'Horizontal ', value: 'h' },
  ];
  static VALUE_DATEFORMAT_TYPES: gf.TDateFormatList = [
    { text: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
    { text: 'YYYY-MM-DD HH:mm:ss.SSS', value: 'YYYY-MM-DD HH:mm:ss.SSS' },
    { text: 'MM/DD/YY h:mm:ss a', value: 'MM/DD/YY h:mm:ss a' },
    { text: 'MMMM D, YYYY LT', value: 'MMMM D, YYYY LT' },
    { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  ];

  static VALUEMAPPINGTYPES: gf.TValueMappingList = [
    { text: 'Value to text', value: 1 },
    { text: 'Range to text', value: 2 },
  ];

  // METHODS
  static TEXTMETHODS: gf.TTextMethodList = [
    { text: 'All content', value: 'content' },
    { text: 'Substring', value: 'pattern' },
    { text: 'Append (Space) ', value: 'as' },
    { text: 'Append (New line) ', value: 'anl' },
  ];
  static COLORMETHODS: gf.TStyleColorList = [
    { text: 'Shape Stroke/Border', value: 'strokeColor' },
    { text: 'Shape Fill', value: 'fillColor' },
    { text: 'Label font color', value: 'fontColor' },
    { text: 'Label background color', value: 'labelBackgroundColor' },
    { text: 'Label border color', value: 'labelBorderColor' },
    { text: 'Image background', value: 'imageBackground' },
    { text: 'Image border', value: 'imageBorder' },
  ];
  static EVENTMETHODS: gf.TStyleEventList = [
    { text: 'Shape : Change form (text)', value: 'shape', type: 'text' },
    { text: 'Shape : Rotate Shape (0-360)', value: 'rotation', type: 'number' },
    { text: 'Shape : Blink (frequence ms)', value: 'blink', type: 'number' },
    { text: 'Shape : Hide/Show (0|1)', value: 'visibility', type: 'number' },
    { text: 'Shape : Opacity (0-100)', value: 'opacity', type: 'number' },
    { text: 'Shape : Collapse/Expande (0|1)', value: 'fold', type: 'number' },
    { text: 'Shape : Change position in Bar (0-100)', value: 'barPos', type: 'number' },
    { text: 'Label : Replace text (text)', value: 'text', type: 'text' },
    { text: 'Label : Font Size (numeric)', value: 'fontSize', type: 'number' },
    { text: 'Label : Opacity (numeric)', value: 'textOpacity', type: 'number' },
  ];
}

export class GFVariables {
  private variables: Map<string, any>;
  // private type : 'local'|'glogal' = 'local';
  constructor() {
    this.variables = new Map();
  }

  /**
   * set or redefine varaible
   *
   * @param {string} key
   * @param {*} value
   * @returns {this}
   * @memberof GFVariables
   */
  set(key: gf.TVariableKeys, value: any): this {
    this.variables.set(key, value);
    return this;
  }

  /**
   * Get variable value
   *
   * @param {string} key
   * @returns {*}
   * @memberof GFVariables
   */
  get(key : gf.TVariableKeys): any {
    return this.variables.get(key);
  }

  /**
   * Clear all variable
   *
   * @returns {this}
   * @memberof GFVariables
   */
  clear(): this {
    this.variables.clear();
    return this;
  }

  /**
   * Replace text with variables
   *
   * @param {string} text
   * @returns {string}
   * @memberof GFVariables
   */
  replaceText(text: string): string {
    try {
      text = GFP.replaceWithText(text);
      for (let [key, value] of this.variables) {
        text = text.replace('${' + key + '}',value);
      }
    } catch (error) {
      return text;
    }
    return text;
  }

  /**
   * Replace and eval text with variables
   *
   * @param {string} text
   * @returns {string}
   * @memberof GFVariables
   */
  eval(text:string):string {
      let t = this.replaceText(text);
      try {
          text = eval(t);
      } catch (error) {
          return t; 
      }
      return text;
  }
}

class GFLog {
  static DEBUG = 0;
  static INFO = 1;
  static WARN = 2;
  static ERROR = 3;
  private static logLevel = GFLog.ERROR;
  private static logDisplay = false;
  constructor() {

  }

  /**
   * If message must be displayed
   *
   * @param {number} level (DEBUG : 0, INFO : 1, WARN:2, ERROR:3)
   * @returns {boolean}
   * @memberof Log
   */
  private static toDisplay(level: number): boolean {
    if (GFLog.logDisplay !== undefined && GFLog.logDisplay === true) {
      if (GFLog.logLevel !== undefined && level >= GFLog.logLevel) {
        return true;
      }
    }
    return false;
  }

  /**
   * Display debug message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async debug(...args) {
    if (GFLog.toDisplay(GFLog.DEBUG)) {
      const title = args.shift();
      console.debug(`GF DEBUG : ${title}`, ...args);
    }
  }

  /**
   * Display warn message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async warn(...args) {
    if (GFLog.toDisplay(GFLog.WARN)) {
      const title = args.shift();
      console.warn(`GF WARN : ${title}`, ...args);
    }
  }

  /**
   * Display info message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async info(...args) {
    if (GFLog.toDisplay(GFLog.INFO)) {
      const title = args.shift();
      console.info(`GF INFO : ${title}`, ...args);
    }
  }
  
  /**
   * Display error message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async error(...args) {
    if (GFLog.toDisplay(GFLog.ERROR)) {
      const title = args.shift();
      console.error(`GF ERROR : ${title}`, ...args);
    }
  }
}

export class GFUtils {
  private static _globalvars: GFVariables = new GFVariables();
  static log: GFLog = new GFLog();
  /**
   * Create and get local variables container
   *
   * @static
   * @returns {GFVariables}
   * @memberof GFUtils
   */
  static getLocalVars(): GFVariables {
    let _v = new GFVariables();
    return _v;
  }

  /**
   * Get global variables container
   *
   * @static
   * @returns {GFVariables}
   * @memberof GFUtils
   */
  private static getGlobalVars(): GFVariables {
    if (GFUtils._globalvars === undefined) {
      GFUtils._globalvars = new GFVariables();
    }
    return GFUtils._globalvars;
  }

  /**
   * Get global variable value
   *
   * @static
   * @param {*} key
   * @returns {*}
   * @memberof GFUtils
   */
  static getVariable(key:any):any {
    return GFUtils.getGlobalVars().get(key);
  }
  
  /**
   * set global variable with value
   *
   * @static
   * @param {*} key
   * @param {*} value
   * @memberof GFUtils
   */
  static setVariable(key:any, value:any) {
    GFUtils.getGlobalVars().set(key,value);
  }
}
