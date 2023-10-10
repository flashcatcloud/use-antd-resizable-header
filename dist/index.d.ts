import * as react from 'react';
import { ReactNode } from 'react';

interface ColumnsStateType {
    /**
     * 持久化的类型，支持 localStorage 和 sessionStorage
     *
     * @param localStorage 设置在关闭浏览器后也是存在的
     * @param sessionStorage 关闭浏览器后会丢失
     */
    persistenceType?: 'localStorage' | 'sessionStorage';
    /** 持久化的key，用于存储到 storage 中 */
    persistenceKey?: string;
}
interface OptionsType<ColumnType extends ColumnOriginType<ColumnType> = Record<string, any>> {
    columns: ColumnType[] | undefined;
    /** @description 最后一列不能拖动，设置最后一列的最小展示宽度，默认120 */
    defaultWidth?: number;
    /** @description 拖动最小宽度 默认0 */
    minConstraints?: number;
    /** @description 拖动最大宽度 默认无穷 */
    maxConstraints?: number;
    /** @description 是否缓存宽度 */
    cache?: boolean;
    /** @description 列状态的配置，可以用来操作列拖拽宽度 */
    columnsState?: ColumnsStateType;
    /** @description 开始拖拽时触发 */
    onResizeStart?: (col: ColumnType & {
        resizableColumns: ColumnType[];
    }) => void;
    /** @description 结束拖拽时触发 */
    onResizeEnd?: (col: ColumnType & {
        resizableColumns: ColumnType[];
    }) => void;
}
type WidthType = number | string;
interface ColumnOriginType<T> {
    width?: WidthType;
    dataIndex?: string | number;
    key?: string | number;
    title?: ReactNode | string;
    children?: T[];
    resizable?: boolean;
    ellipsis?: any;
    hideInTable?: boolean;
}
declare function useAntdResizableHeader<ColumnType extends ColumnOriginType<ColumnType>>(props: OptionsType<ColumnType>): {
    resizableColumns: any[];
    components: {
        header: {
            cell: react.NamedExoticComponent<{
                onResize: (width: number) => void;
                onMount: (width: number) => void;
                onResizeStart?: ((width: number) => void) | undefined;
                onResizeEnd?: ((width: number) => void) | undefined;
                triggerRender: number;
                width: number;
                minWidth: number;
                maxWidth: number;
            } & react.ThHTMLAttributes<HTMLTableCellElement>>;
        };
    };
    tableWidth: number | undefined;
    resetColumns: () => void;
};

declare const ResizableUniqIdPrefix = "resizable-table-id";

export { OptionsType, ResizableUniqIdPrefix, useAntdResizableHeader as default, useAntdResizableHeader };
