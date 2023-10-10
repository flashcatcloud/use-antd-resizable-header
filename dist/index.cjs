'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var reactResizable = require('react-resizable');
var jsxRuntime = require('react/jsx-runtime');
var debounce = require('lodash.debounce');
var throttle = require('lodash.throttle');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var debounce__default = /*#__PURE__*/_interopDefault(debounce);
var throttle__default = /*#__PURE__*/_interopDefault(throttle);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var useUnmountedRef = () => {
  const unmountedRef = react.useRef(false);
  react.useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};

// src/utils/useSafeState.ts
function useSafeState(initialState) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = react.useState(initialState);
  const setCurrentState = react.useCallback((currentState) => {
    if (unmountedRef.current)
      return;
    setState(currentState);
  }, []);
  return [state, setCurrentState];
}

// src/utils/index.ts
function depthFirstSearch(children, condition, width) {
  const c = [...children];
  (function find(cls) {
    if (!cls)
      return;
    for (let i = 0; i < (cls == null ? void 0 : cls.length); i++) {
      if (condition(cls[i])) {
        cls[i] = __spreadProps(__spreadValues({}, cls[i]), {
          width
        });
        return;
      }
      if (cls[i].children) {
        find(cls[i].children);
      }
    }
  })(c);
  return c;
}
function isString(data) {
  return typeof data === "string";
}
function isEmpty(data) {
  if (typeof data !== "object" || data === null) {
    return true;
  }
  if (Array.isArray(data) && data.length) {
    return false;
  }
  if (Object.keys(data).length) {
    return false;
  }
  return true;
}
var ResizableHeader = (props) => {
  const _a = props, {
    width,
    minWidth,
    maxWidth,
    onResize,
    onResizeStart,
    onResizeEnd,
    onMount,
    triggerRender,
    className,
    style,
    onClick,
    children,
    rowSpan,
    colSpan,
    title,
    scope
  } = _a, rest = __objRest(_a, [
    "width",
    "minWidth",
    "maxWidth",
    "onResize",
    "onResizeStart",
    "onResizeEnd",
    "onMount",
    "triggerRender",
    "className",
    "style",
    "onClick",
    "children",
    "rowSpan",
    "colSpan",
    "title",
    "scope"
  ]);
  const thRef = react.useRef(null);
  const [resizeWidth, setResizeWidth] = useSafeState(0);
  react.useEffect(() => {
    if (width) {
      setResizeWidth(width);
      onMount == null ? void 0 : onMount(width);
    }
  }, [triggerRender]);
  react.useEffect(() => {
    if (width) {
      setResizeWidth(width);
    }
  }, [setResizeWidth, width]);
  if (!width || Number.isNaN(Number(width))) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "th",
      __spreadProps(__spreadValues({}, rest), {
        "data-arh-disable": "true",
        style,
        className,
        onClick,
        rowSpan,
        colSpan,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { title, children })
      })
    );
  }
  const setBodyStyle = (active) => {
    document.body.style.userSelect = active ? "none" : "";
    document.body.style.pointerEvents = active ? "none" : "";
    document.documentElement.style.cursor = active ? "col-resize" : "";
  };
  const onStart = ({}, data) => {
    setResizeWidth(data.size.width);
    setBodyStyle(true);
    onResizeStart == null ? void 0 : onResizeStart(data.size.width);
  };
  const onSelfResize = ({}, data) => {
    setResizeWidth(data.size.width);
  };
  const onStop = () => {
    if (resizeWidth <= 0)
      return;
    onResize(resizeWidth);
    setBodyStyle(false);
    onResizeEnd == null ? void 0 : onResizeEnd(resizeWidth);
  };
  const isSimpleChildren = () => {
    var _a2, _b;
    if (Array.isArray(children)) {
      const lastChild = children[children.length - 1];
      if (lastChild) {
        return isString(lastChild) || ((_a2 = lastChild.props) == null ? void 0 : _a2.ellipsis) || isString((_b = lastChild.props) == null ? void 0 : _b.label);
      }
    }
    return false;
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "th",
    {
      scope,
      className: `resizable-container ${className}`,
      style: __spreadProps(__spreadValues({}, style), {
        overflow: "unset"
      }),
      "data-arh-enable": "true",
      ref: thRef,
      onClick,
      rowSpan,
      colSpan,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          reactResizable.Resizable,
          {
            className: "resizable-box",
            width: resizeWidth,
            minConstraints: [minWidth, 0],
            maxConstraints: [maxWidth, 0],
            height: 0,
            handle: /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: "resizable-handler",
                onClick: (e) => {
                  e.stopPropagation();
                },
                children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "resizable-line" })
              }
            ),
            draggableOpts: { enableUserSelectHack: false },
            onResizeStart: onStart,
            onResize: onSelfResize,
            onResizeStop: onStop,
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { style: { width: resizeWidth, height: "100%" } })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", __spreadProps(__spreadValues({}, rest), { className: `resizable-title ${isSimpleChildren() ? "ellipsis" : ""}`, children: /* @__PURE__ */ jsxRuntime.jsx("span", { title, children }) }))
      ]
    }
  );
};
var ResizableHeader_default = react.memo(ResizableHeader);
function useCreation(factory, deps) {
  const { current } = react.useRef({
    deps,
    obj: void 0,
    initialized: false
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj;
}
function depsAreSame(oldDeps, deps) {
  if (oldDeps === deps)
    return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (oldDeps[i] !== deps[i])
      return false;
  }
  return true;
}

// src/utils/useDebounceFn.ts
function useDebounceFn(fn, options) {
  var _a;
  const fnRef = react.useRef(fn);
  fnRef.current = fn;
  const wait = (_a = options == null ? void 0 : options.wait) != null ? _a : 1e3;
  const debounced = useCreation(
    () => debounce__default.default(
      (...args) => {
        return fnRef.current(...args);
      },
      wait,
      options
    ),
    []
  );
  react.useEffect(() => {
    debounced.cancel();
  }, []);
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush
  };
}
var GETKEY = "dataIndex";
var ResizableUniqIdPrefix = "resizable-table-id";
function getUniqueId(s) {
  return `${ResizableUniqIdPrefix}-${s}`;
}
function getColumns(list) {
  const trulyColumns = list;
  const c = trulyColumns == null ? void 0 : trulyColumns.map((col, index) => {
    var _a;
    return __spreadProps(__spreadValues({}, col), {
      children: ((_a = col == null ? void 0 : col.children) == null ? void 0 : _a.length) ? getColumns(col.children) : void 0,
      [GETKEY]: col[GETKEY] || col.key || getUniqueId(`${col.title}-${index}`)
    });
  });
  return c;
}
function useGetDataIndexColumns(columns) {
  const dataIndexColumns = react.useMemo(() => getColumns(columns), [columns]);
  return dataIndexColumns || columns;
}
function useMemoizedFn(fn) {
  const fnRef = react.useRef(fn);
  fnRef.current = react.useMemo(() => fn, [fn]);
  const memoizedFn = react.useRef();
  if (!memoizedFn.current) {
    memoizedFn.current = function(...args) {
      return fnRef.current.apply(this, args);
    };
  }
  return memoizedFn.current;
}

// src/utils/useLocalColumns.ts
function mergeColumns(src, target, mergeKey) {
  const res = src;
  if (Array.isArray(res) && Array.isArray(target)) {
    res.forEach((t, i) => {
      var _a, _b;
      if (t == null ? void 0 : t.children) {
        mergeColumns(t.children, (_a = target[i]) == null ? void 0 : _a.children, mergeKey);
      } else {
        res[i][mergeKey] = ((_b = target.find((x) => x.dataIndex === res[i].dataIndex)) == null ? void 0 : _b[mergeKey]) || res[i][mergeKey];
      }
    });
  }
  return res;
}
function useLocalColumns({
  columnsState,
  resizableColumns,
  columns,
  isResized
}) {
  const columnsProp = useGetDataIndexColumns(columns);
  const initLocalColumns = useMemoizedFn(() => {
    var _a;
    const { persistenceType, persistenceKey } = columnsState || {};
    if (!persistenceKey || !persistenceType) {
      return columnsProp;
    }
    if (typeof window === "undefined")
      return columnsProp;
    const storage = window[persistenceType];
    try {
      const localResizableColumns = (_a = JSON.parse((storage == null ? void 0 : storage.getItem(persistenceKey)) || "{}")) == null ? void 0 : _a.resizableColumns;
      return mergeColumns(columnsProp || [], localResizableColumns, "width");
    } catch (error) {
    }
  });
  const [localColumns, setLocalColumns] = react.useState(initLocalColumns);
  react.useEffect(() => {
    setLocalColumns(initLocalColumns());
  }, [columnsProp]);
  react.useEffect(() => {
    const { persistenceType, persistenceKey } = columnsState || {};
    if (!persistenceKey || !persistenceType || !(resizableColumns == null ? void 0 : resizableColumns.length)) {
      return;
    }
    if (typeof window === "undefined")
      return;
    const storage = window[persistenceType];
    try {
      if (isResized) {
        storage.setItem(
          persistenceKey,
          JSON.stringify(__spreadProps(__spreadValues({}, JSON.parse((storage == null ? void 0 : storage.getItem(persistenceKey)) || "{}")), {
            resizableColumns: resizableColumns.map((col) => {
              const localCol = {
                dataIndex: col.dataIndex,
                key: col.key,
                width: col.width,
                children: col.children
              };
              if (isString(col.title)) {
                localCol.title = col.title;
              }
              return localCol;
            })
          }))
        );
      }
    } catch (error) {
    }
  }, [resizableColumns, isResized]);
  const resetLocalColumns = useMemoizedFn(() => {
    setLocalColumns([...columnsProp || []]);
  });
  return {
    localColumns: react.useMemo(() => localColumns, [localColumns]),
    resetLocalColumns
  };
}
function useLatest(value) {
  const ref = react.useRef(value);
  ref.current = value;
  return ref;
}
var createUpdateEffect = (hook) => (effect, deps) => {
  const isMounted = react.useRef(false);
  hook(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};
function useThrottleFn(fn, options) {
  var _a;
  const fnRef = react.useRef(fn);
  fnRef.current = fn;
  const wait = (_a = options == null ? void 0 : options.wait) != null ? _a : 1e3;
  const throttled = useCreation(
    () => throttle__default.default(
      (...args) => {
        return fnRef.current(...args);
      },
      wait,
      options
    ),
    []
  );
  react.useEffect(() => {
    throttled.cancel();
  }, []);
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}
var useUpdateEffect = createUpdateEffect(react.useEffect);

// src/utils/useThrottleEffect.ts
function useThrottleEffect(effect, deps, options) {
  const [flag, setFlag] = react.useState({});
  const { run, cancel } = useThrottleFn(() => {
    setFlag({});
  }, options);
  react.useEffect(() => {
    return run();
  }, deps);
  react.useEffect(cancel, []);
  useUpdateEffect(effect, [flag]);
}

// src/utils/useUpdateThrottleEffect.ts
var useUpdateThrottleEffect = createUpdateEffect(useThrottleEffect);
var isBrowser = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var useIsomorphicLayoutEffect = isBrowser ? react.useLayoutEffect : react.useEffect;

// src/useAntdResizableHeader.tsx
var WIDTH = 120;
function useAntdResizableHeader(props) {
  const {
    columns: columnsProp,
    defaultWidth = WIDTH,
    minConstraints = WIDTH / 2,
    maxConstraints = Infinity,
    cache = true,
    columnsState,
    onResizeStart: onResizeStartProp,
    onResizeEnd: onResizeEndProp
  } = props;
  const widthCache = react.useRef(/* @__PURE__ */ new Map());
  const [resizableColumns, setResizableColumns] = useSafeState(columnsProp || []);
  const lastestColumns = useLatest(resizableColumns);
  const [isResized, setIsResized] = useSafeState(false);
  const { localColumns: columns, resetLocalColumns } = useLocalColumns({
    columnsState,
    columns: columnsProp,
    resizableColumns,
    isResized
  });
  const [tableWidth, setTableWidth] = useSafeState();
  const [triggerRender, forceRender] = react.useReducer((s) => s + 1, 0);
  let kvMap;
  const resetColumns = useMemoizedFn(() => {
    kvMap = /* @__PURE__ */ new Map();
    widthCache.current = kvMap;
    resetLocalColumns();
  });
  const onMount = react.useCallback(
    (id) => (width) => {
      if (width) {
        setResizableColumns((t) => {
          const nextColumns = depthFirstSearch(t, (col) => col[GETKEY] === id && !!col.width, width);
          kvMap = kvMap || /* @__PURE__ */ new Map();
          function dig(cols) {
            cols.forEach((col, i) => {
              const key = col[GETKEY];
              kvMap.set(key != null ? key : "", { width: col == null ? void 0 : col.width, index: i });
              if (col == null ? void 0 : col.children) {
                dig(col.children);
              }
            });
          }
          dig(nextColumns);
          widthCache.current = kvMap;
          return nextColumns;
        });
      }
    },
    []
  );
  const onResize = react.useMemo(() => onMount, [onMount]);
  const onResizeStart = (col) => (width) => {
    onResizeStartProp == null ? void 0 : onResizeStartProp(__spreadProps(__spreadValues({}, col), {
      width,
      resizableColumns: lastestColumns.current
    }));
  };
  const onResizeEnd = (col) => (width) => {
    setIsResized(true);
    onResizeEndProp == null ? void 0 : onResizeEndProp(__spreadProps(__spreadValues({}, col), {
      width,
      resizableColumns: lastestColumns.current
    }));
  };
  const getColumns2 = useMemoizedFn((list) => {
    const trulyColumns = list == null ? void 0 : list.filter((item) => !isEmpty(item));
    const c = trulyColumns.map((col) => {
      var _a, _b, _c, _d;
      return __spreadProps(__spreadValues({}, col), {
        children: ((_a = col == null ? void 0 : col.children) == null ? void 0 : _a.length) ? getColumns2(col.children) : void 0,
        onHeaderCell: (column) => {
          var _a2, _b2, _c2;
          return {
            dataindex: column.dataIndex,
            title: typeof (col == null ? void 0 : col.title) === "string" ? col == null ? void 0 : col.title : "",
            width: cache ? ((_c2 = (_b2 = widthCache.current) == null ? void 0 : _b2.get((_a2 = column[GETKEY]) != null ? _a2 : "")) == null ? void 0 : _c2.width) || (column == null ? void 0 : column.width) : column == null ? void 0 : column.width,
            resizable: column.resizable,
            onMount: onMount(column == null ? void 0 : column[GETKEY]),
            onResize: onResize(column == null ? void 0 : column[GETKEY]),
            onResizeStart: onResizeStart(column),
            onResizeEnd: onResizeEnd(column),
            minWidth: minConstraints,
            maxWidth: maxConstraints,
            triggerRender
          };
        },
        width: cache ? ((_d = (_c = widthCache.current) == null ? void 0 : _c.get((_b = col[GETKEY]) != null ? _b : "")) == null ? void 0 : _d.width) || (col == null ? void 0 : col.width) : col == null ? void 0 : col.width,
        ellipsis: typeof col.ellipsis !== "undefined" ? col.ellipsis : true,
        [GETKEY]: col[GETKEY] || col.key
      });
    });
    return c;
  });
  useIsomorphicLayoutEffect(() => {
    if (columns) {
      const c = getColumns2(columns);
      setResizableColumns(c);
    }
  }, [columns]);
  useUpdateThrottleEffect(
    () => {
      const t = getColumns2(resizableColumns);
      setResizableColumns(t);
    },
    [triggerRender],
    {
      wait: 500
    }
  );
  useIsomorphicLayoutEffect(() => {
    let width = 0;
    (function loop(cls) {
      for (let i = 0; i < cls.length; i++) {
        if (cls[i].children) {
          loop(cls[i].children);
        } else {
          if (!cls[i].hideInTable) {
            width += Number(cls[i].width) || defaultWidth;
          }
        }
      }
    })(resizableColumns);
    setTableWidth(width);
  }, [defaultWidth, resizableColumns]);
  const { run: debounceRender } = useDebounceFn(forceRender);
  react.useEffect(() => {
    window.addEventListener("resize", debounceRender);
    return () => {
      window.removeEventListener("resize", debounceRender);
    };
  }, [debounceRender]);
  const components = react.useMemo(() => {
    return {
      header: {
        cell: ResizableHeader_default
      }
    };
  }, []);
  return {
    resizableColumns,
    components,
    tableWidth,
    resetColumns
  };
}

// src/index.ts
var src_default = useAntdResizableHeader;

exports.ResizableUniqIdPrefix = ResizableUniqIdPrefix;
exports.default = src_default;
exports.useAntdResizableHeader = useAntdResizableHeader;
