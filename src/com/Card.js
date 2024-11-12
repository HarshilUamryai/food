import React, { useState, useEffect, useRef } from 'react';
import { useCreateState, useCreateDispatch } from './Cont';

export default function Card(props) {
    const dispatch = useCreateDispatch();
    const options = props.options || {};
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const state = useCreateState();
    const price = useRef();
    const fprice = qty * parseInt(options[size]);
    const handleAddToCart = async () => {
        let food = [];
        for (const item of state) {
            if (item.id === props.id) {
                food = item;
                break;
            }
        }

      

        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: food.id, price: fprice, qty: qty });
                return;
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: food.id, name: food.name, price: fprice, qty: qty, size: size, img: props.img });
                return;
            }
            return;
        }

        if (props.id && props.foodname) {
            await dispatch({ type: "ADD", id: props.id, name: props.foodname, price: fprice, qty: qty, size: size });
            console.log(state);
        } else {
            console.error("Missing product ID or name");
        }
    };

    useEffect(() => {
        setSize(price.current.value);
    }, []);

    return (
        <div>
            <div className="card mt-4" style={{ width: "18rem" }}>
                <img src={props.img} className="card-img-top" alt="Food item" />
                <div className="card-body">
                    <h5 className="card-title">{props.foodname}</h5>
                    <div className="container w-100">
                        <select className="mcs m-3 h-100 bg-danger" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                );
                            })}
                        </select>
                        <select className="mcs m-3 h-100 bg-danger rounded" ref={price} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>;
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>${fprice}/-</div>
                        <hr />
                        <div className="btn btn-danger justify-center ms-2" onClick={handleAddToCart}> Add to cart</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
