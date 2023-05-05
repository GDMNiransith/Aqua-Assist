import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";


 const AddInventory=()=>{

    const [inventory,SetInventory] = useState((
        {
            'WaterBottles' : '',
            'LunchPackets' : '',
            'Funding' : '',
            'Metirials' : '',
            'CoolDrinks' : '',
        }
    ))

    const [message, setMessage] = useState();

    const{WaterBottles, LunchPackets, Funding, Metiriaks, CoolDrinks} = inventory;

    const HandleChange = ((e)=>{
        SetInventory({...inventory,[e.target.name]: e.target.value})
    })



    const submitForm = async(e)=>{
        e.preventDefault()

        await axios.post('http://localhost:5000/campaign/add', inventory)
        .then((result) => {

            setMessage("Campaign has been added successfully!");

        }).catch((err) => {
            alert('Something went wrong!')
        });

    }



    return(

<div>
 
 <div className = "container" style={{width: "30%" }}>
 <br></br><br></br><br></br><br></br>

<form onSubmit={e=>submitForm(e)}>

<div className="form-group">
    <div className='col-md-12 text-center'><h2>What do you Need For Iventory 🍞</h2></div>
</div>
<div className="form-group">
    <div className='col-md-12 text-center'><h2>{message}</h2></div>
</div>




<div className="form-group">
<label htmlFor="WaterBottles">WaterBottles</label>
<input
type="Number"
className="form-control"
name="WaterBottles"
placeholder="How many WaterBottles"
value={WaterBottles}
onChange={e=>HandleChange(e)}
/>
</div>

<div className="form-group">
<label htmlFor="LunchPackets">LunchPackets</label>
<input
type="Number"
className="form-control"
name="LunchPackets"
placeholder="How many LunchPackets"
value={LunchPackets}
onChange={e=>HandleChange(e)}
/>
</div>

<div className="form-group">
<label htmlFor="Funding">Funding</label>
<input
type="Number"
className="form-control"
name="Funding"
placeholder="Enter Funding"
value={Funding}
onChange={e=>HandleChange(e)}
/>
</div>

<div className="form-group">
<label htmlFor="Metirials">Materials</label>
<input
type="Number"
className="form-control"
name="Metirials"
placeholder="Metirials"
value={Metiriaks}
onChange={e=>HandleChange(e)}
/>
</div>

<div className="form-group">
<label htmlFor="CoolDrinks">Soft Drinks</label>
<input
type="Number"
className="form-control"
name="CoolDrinks"
placeholder="How many CoolDrinks"
value={CoolDrinks}
onChange={e=>HandleChange(e)}
/>
</div>

<br></br>

<button type="submit" className="btn btn-primary">
Post
</button>
</form>


</div>
</div>
    )}

export default AddInventory;
