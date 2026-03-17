import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Pending", value: 5 },
  { name: "Cleaning", value: 3 },
  { name: "Completed", value: 7 }
];

const COLORS = ["#ff4444","#ffaa00","#00C851"];

function AdminChart(){

return(

<div style={{textAlign:"center"}}>

<h2>Complaint Status Chart</h2>

<PieChart width={400} height={300}>

<Pie
data={data}
cx="50%"
cy="50%"
outerRadius={100}
dataKey="value"
>

{data.map((entry,index)=>(
<Cell key={index} fill={COLORS[index]}/>
))}

</Pie>

<Tooltip/>

</PieChart>

</div>

)

}

export default AdminChart;