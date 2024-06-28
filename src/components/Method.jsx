import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Method = () => {

    const [text, settext] = useState([]);
    const [list, setlist] = useState({});
    const [view, setview] = useState({});

    let getapi = async () => {
        let res = await axios.get("http://localhost:3001/products");
        console.log(res);
        // let result = res.data
        // console.log(result);
        settext(res.data)
    }

    let submit = async () => {
        let res = await axios.post("http://localhost:3001/products", list);
        console.log(res);
        settext([...text, res.data])
    }

    let handle = (e) => {
        setlist({ ...list, [e.target.name]: e.target.value });
    }

    let deletedata = async (id) => {
        let res = await axios.delete("http://localhost:3001/products" + `/${id}`)
        console.log(res);
        settext(text.filter((val, ind) => val.id != id))
    }

    let updatedata = (val) => {
        setview(val);
    }

    let viewhandle=(e)=>{
        setview({...view,[e.target.name]:e.target.value})
    }

    let savedata =async()=>{
        let res = await axios.put(`http://localhost:3001/products/${view.id}`,view)
        console.log(res);

        settext(text.map((val)=>val.id==res.data.id?{...view}:val))
    }

    useEffect(() => {
        getapi()
    }, [])

    return (
        <div>
            Product name : <input type="text" onChange={handle} name='product' /><br /><br />
            Product price : <input type="number" onChange={handle} name='price' /><br /><br />
            <button onClick={submit}>Submit</button><br /><br />

            <div className="model" >
                <form>
                    <div className="form-data" onSubmit={submit}>
                        product name : <input type="text" name='product' value={view.product} onChange={viewhandle} /><br /><br />
                        price : <input type="number" name='price' value={view.price} onChange={viewhandle} /><br /><br />
                        <button onClick={savedata}>save</button>
                    </div>
                </form>
            </div>

            <table border={1} cellPadding={20} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>product</th>
                        <th>price</th>
                        <th>delete</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        text.map((val, ind) => {
                            return (
                                <tr>
                                    <td>{val.product}</td>
                                    <td>{val.price}</td>
                                    <td><button onClick={() => deletedata(val.id)}>delete</button></td>
                                    <td><button onClick={() => updatedata(val)}>update</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


        </div>
    )
}

export default Method;
