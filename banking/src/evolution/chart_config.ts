import { simulateMonths, sumTransactions } from "./evolution_utils"
import Cookies from 'js-cookie'

export function computeDataAndFutureData(dataLabels: Array<String>, data: Array<number>, duration: number) {
    console.log(dataLabels)
    console.log(data)
    duration = duration + data.length
    let futureData = Array(duration).fill(sumTransactions(JSON.parse(Cookies.get("futureTransactions"))));
    let allDataSums = [...data, ...futureData]
    allDataSums = allDataSums.reduce((acc, cur) => {
        if (acc.length > 0) {
          acc.push(cur + acc[acc.length - 1]);
        } else {
          acc.push(cur);
        }
        return acc;
      }, []);
    return {
    labels: simulateMonths("2023-03", duration),
    datasets: [
      {
        label: 'Data One',
        // pointBackgroundColor: (ctx: any) => {
        //     const value = ctx.dataIndex;
        //     console.log(value)
        //     if (value<data.length){
        //         return "pink"
        //     } else{
        //         return "red"
        //     }
        //   },
        borderColor: (ctx: any) => {
            const value = ctx.dataIndex;
            if (value<data.length){
                return "pink"
            } else{
                return "red"
            }
          },
        data: allDataSums,
        // borderBackgroundColor: function(context: any) {
        //     var index = context.dataIndex
        //     var value = context.dataset.data[index]
        //     return value > 100 ? 'green' : 'red'
        // }

      }
    ]
  }}
  
  export const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
    	yAxes: [{
        ticks: {
          min: 0,
          max: 500,
          stepSize: 100,
		  reverse: false,
          beginAtZero: true
        }
      }]
    }
  }
  