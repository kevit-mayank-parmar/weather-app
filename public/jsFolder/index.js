import axios from "axios";
console.log("Static JavaScript is loaded.");

async function ClientData() {
  try {
    const res = await axios.get(`http://localhost:3000/weather?city=rajkot`);
    const data = res.data;
    console.log(data);
  } catch (error) {
    console.log(error, "hi");
  }
}

ClientData();
