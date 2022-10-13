/**
 * This file was generated from CustomNativeLineChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface DataListType {
    data: ListValue;
    dataAttribute: ListAttributeValue<Big | Date>;
    legend: DynamicValue<string>;
    color: DynamicValue<string>;
}

export interface DataListPreviewType {
    data: {} | { type: string } | null;
    dataAttribute: string;
    legend: string;
    color: string;
}

export interface CustomNativeLineChartProps<Style> {
    name: string;
    style: Style[];
    labelsData: ListValue;
    labelAttribute: ListAttributeValue<Big | string | Date>;
    dataList: DataListType[];
    showBGLines: boolean;
    bezier: boolean;
    alwaysShowZero: boolean;
    showDots: boolean;
    chartHeight: number;
    bgFrom: DynamicValue<string>;
    bgTo: DynamicValue<string>;
    bgFromOpacity: Big;
    bgToOpacity: Big;
    strokeWidth: number;
    strokeColor: DynamicValue<string>;
    labelColor: DynamicValue<string>;
}

export interface CustomNativeLineChartPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    labelsData: {} | { type: string } | null;
    labelAttribute: string;
    dataList: DataListPreviewType[];
    showBGLines: boolean;
    bezier: boolean;
    alwaysShowZero: boolean;
    showDots: boolean;
    chartHeight: number | null;
    bgFrom: string;
    bgTo: string;
    bgFromOpacity: number | null;
    bgToOpacity: number | null;
    strokeWidth: number | null;
    strokeColor: string;
    labelColor: string;
}
