<template>
    <div>
        <div>
            <ve-line :data="lineData"></ve-line>
        </div>
    </div>
</template>

<script>
    import Veline from 'v-charts/lib/line.common';
    export default {
        name: "Echarts",
        comments:{
            Veline
        },
        data(){
            return {
                linetData: {
                    columns: ['日期', '访问用户', '下单用户', '下单率'],
                    rows: [
                        {'日期': '2018-01-01', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
                        {'日期': '2018-01-02', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
                        {'日期': '2018-01-03', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>