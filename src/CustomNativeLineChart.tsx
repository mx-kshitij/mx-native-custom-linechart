import { ReactElement, createElement, useState } from "react";
import { TextStyle, ViewStyle, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ValueStatus } from "mendix";
import { mergeNativeStyles, Style } from "@mendix/pluggable-widgets-tools";
import { CustomNativeLineChartProps } from "../typings/CustomNativeLineChartProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}


export function CustomNativeLineChart({
    style,
    labelsData,
    labelAttribute,
    dataList,
    chartHeight,
    bgFrom,
    bgTo,
    bgFromOpacity,
    bgToOpacity,
    strokeWidth,
    strokeColor,
    labelColor,
    showBGLines,
    bezier,
    alwaysShowZero,
    showDots
}: CustomNativeLineChartProps<CustomStyle>): ReactElement {

    if (labelsData === undefined || labelAttribute === undefined || dataList === undefined || labelsData.status != ValueStatus.Available) return <View />

    //Merge styles coming from mendix with local styles
    // @ts-ignore
    const mergedStyles = mergeNativeStyles(customStyle, style);
    //Variable to load widget or not
    var dataLoaded: boolean = true;

    //Calculated chart width
    const [chartWidth, setChartWidth] = useState<number>(100);

    //Function to get the data from various data sources for y axis
    const getDataSets = () => {
        var dataSets: any[] = [];
        //Iterate over different series
        dataList.map(dataSet => {
            //Get data points
            var dataSetSource = dataSet.data.items;
            var data: any[] = [];
            //Iterate over data points to generate series array 
            dataSetSource?.map(item => {
                var value = dataSet.dataAttribute.get(item).value;
                if (value) data.push(value.toString());
            })
            //Get color
            var color : string | undefined = dataSet.color.value?.toString(); 
            //Set series in the array
            dataSets.push({ data: data, color: () => color? color: "#000" });
        })
        return dataSets;
    }

    //Function to get data labels
    const getLabels = () => {
        var labels: string[] = [];
        //Iterate over items to generate labels array
        labelsData.items?.map(item => {
            var value = labelAttribute.get(item).value;
            if (value) labels.push(value.toString());
        })
        return labels;
    }

    //Function to get legends
    const getLegends = () => {
        var legends: string[] = [];
        //Iterate over items to generate legends array
        dataList.map(dataSet => {
            var value = dataSet.legend.value?.toString();
            if (value) legends.push(value);
        })
        return legends;
    }

    //Function to return the data for chart
    const getData = () => {
        const data = {
            labels: getLabels(),
            datasets: getDataSets(),
            legend: getLegends()
        };
        return data;
    }

    //Function to configure chart. More options here ->  https://github.com/indiespirit/react-native-chart-kit#chart-style-object
    const chartConfig = {
        backgroundGradientFrom: bgFrom.value? bgFrom.value.toString() : "#FFF",
        backgroundGradientTo: bgTo.value? bgTo.value.toString() : "#FFF",
        backgroundGradientFromOpacity: bgFromOpacity ? (bgFromOpacity.toNumber()/100) : 1,
        backgroundGradientToOpacity: bgToOpacity ? (bgToOpacity.toNumber()/100) : 1,
        color: () => strokeColor.value? strokeColor.value.toString() : "#000",
        labelColor: () => labelColor.value? labelColor.value.toString() : "#000",
        strokeWidth: strokeWidth? strokeWidth : 3,
        useShadowColorFromDataset: false,
        propsForBackgroundLines:{
            strokeWidth: showBGLines ? "1" : "0"
        }
    };

    //Calculate width for widget on load
    const onOuterViewLayout = (event: any) => {
        var { width } = event.nativeEvent.layout;
        setChartWidth(width);
    }

    //Function to load the chart
    const loadChart = () => {
        //When all data sources are ready, load chart
        dataList.forEach(item => {
            if (item.data.status != ValueStatus.Available) dataLoaded = false;
        })
        if (dataLoaded) {
            return (
                //Return line char. More options here -> https://github.com/indiespirit/react-native-chart-kit#line-chart
                <LineChart
                    data={getData()}
                    width={chartWidth}
                    height={chartHeight}
                    chartConfig={chartConfig}
                    style={mergedStyles.lineChart}
                    fromZero={alwaysShowZero}
                    bezier={bezier}
                    withDots={showDots}
                />)
        }
        else {
            return (null)
        }

    }

    return (
        <View style={mergedStyles.container} onLayout={event => onOuterViewLayout(event)}>
            {loadChart()}
        </View>);
}

const customStyle = () =>
    StyleSheet.create({
        container: {
            flex: 1
        },
        label: {

        },
        lineChart: {

        }
    });