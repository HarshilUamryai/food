import React, { useEffect, useState } from 'react';
import Card from '../com/Card';
import Footer from '../com/Footer';
import Cap from '../com/Cap';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from './Cart';
import { useCreateState} from '../com/Cont'
export default function Home() {
    const [search, setSearch] = useState('');
    const [Food, setFood] = useState([]);
    const [FoodCat, setFoodCat] = useState([]);
    const navigate = useNavigate();
  const [cartv,setcartv]=useState();
  let data =  useCreateState();
    const handleLogout = () => {
        localStorage.removeItem("auto");
        navigate("/Login");
    }

    const load = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/Datafood", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let data = await response.json();
            setFood(data[0]);
            setFoodCat(data[1]);
            console.log(data[0], data[1]);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-danger">
                    <div className="container-fluid">
                        <Link className="navbar-brand fs-1 p-3 mb-2 text-white" to="/">FoodMarket</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                                </li>
                                {localStorage.getItem("auto") &&
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                                    </li>
                                }
                            </ul>
                            <div className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                                {!localStorage.getItem("auto") ?
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav me-auto mb-2">
                                            <li className="nav-item">
                                                <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="btn bg-white text-success mx-1" to="/user">Signup</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    :
                                    <div className="d-flex">
                                        <div className="btn bg-white text-success mx-2" onClick={()=>{setcartv(true)}}>
                                            My Cart {" "} <Badge pill bg="danger">{data.length}</Badge>

                                        </div>
                                        {cartv? <Modal onClose={()=>setcartv(false)}><Cart/></Modal>:null}
                                        <div className="btn bg-white text-success mx-2" onClick={handleLogout}>
                                            Logout
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <Cap />
            </div>
            <div className="container">
                {FoodCat.length > 0 ? FoodCat.map((data) => {
                    return (
                        <div className="row mb-2" key={data._id}>
                            <div>
                                <div>{data.CategoryName}</div>
                            </div>
                            <hr />
                            {Food.length > 0
                                ? Food.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(flat => {
                                    return (
                                        <div key={flat._id} className="col-12 col-md-6 col-lg-3">
                                            <Card foodname={flat.name}
                                                img={flat.img}
                                                options={flat.options[0]}
                                                description={flat.description}
                                                id={flat._id}>
                                            </Card>
                                        </div>
                                    );
                                })
                                : "No items found."
                            }
                        </div>
                    );
                }) : "No categories found."}
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
