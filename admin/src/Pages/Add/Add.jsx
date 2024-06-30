import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import axios from "axios"
import "./Add.css";
import { toast } from 'react-toastify';
const Add = ({url}) => {
 
  const [image,setImage]=useState(false);
  const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:"Select",
  });

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  } 

  const onSubmitHandler=async(event)=>{
   
      event.preventDefault();
      const formData=new FormData();
      formData.append("name",data.name);
      formData.append("description",data.description);
      formData.append("price",Number(data.price));
      formData.append("category",data.category);
      formData.append("image",image);

      const response=await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"",
      });
      setImage(false);
      toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);

      }
  }
  return (
    <div className='add'>
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=""/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name}type="text" name="name" plavceholder='Type here'/>

        </div>
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description"  rows="6" placeholder='Write Content Here' required></textarea>


        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
            <option value="">Select</option>
              <option value="Paneer">Paneer</option>
              <option value="Chicken">Chicken</option>
              <option value="Mushroom">Mushroom</option>
              <option value="Tandoor">Tandoor</option>
              <option value="Tea and Coffee">Tea and coffee</option>
              <option value="Chinese and Noodles">chinese and Noodles</option>
              <option value="Chaaps and rolls">chaaps and rolls</option>
              <option value="Eggs">Eggs</option>
            </select>
          </div>
          <div className='add-price flex-xol'>
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder="20"/>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>

      </form>
       
    </div>
  )
}

export default Add
