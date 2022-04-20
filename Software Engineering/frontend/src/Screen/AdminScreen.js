import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {saveaProduct,listaProducts,deleteaProduct} from '../actions/aproductActions';

function AdminScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [uploading, setUploading] = useState(false);
  const aproductList = useSelector((state) => state.aproductList);
  const { loading, aproducts, error } = aproductList;

  const aproductSave = useSelector(state => state.aproductSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = aproductSave;

  const aproductDelete = useSelector(state => state.aproductDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = aproductDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
  }, [successSave, successDelete]);

  useEffect(() => {
    dispatch(listaProducts());
}, [dispatch]); 

  const openModal = (aproduct) => {
    setModalVisible(true);
    setId(aproduct._id);
    setName(aproduct.name);
    setPrice(aproduct.price);
    setImage(aproduct.image);
    setType(aproduct.type);
    setCountInStock(aproduct.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    var r = window.confirm("Are you sure to keep this item?");
        if (r == true) {
          dispatch(
            saveaProduct({
              _id: id,
              name,
              price,
              image,
              type,
              countInStock,
            })
          );
        } 
        else {}

  };
  const deleteHandler = (aproduct) => {
    var r = window.confirm("Are you sure to delete this item?");
        if (r == true) {
          dispatch(deleteaProduct(aproduct._id));
        } 
        else {}
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
      
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  name="type"
                  value={type}
                  id="type"
                  onChange={(e) => setType(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>TYPE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
          {aproducts?.map((aproduct) => (
              <tr key={aproduct._id}>
                <td>{aproduct._id}</td>
                <td>{aproduct.name}</td>
                <td>{aproduct.price}</td>
                <td>{aproduct.type}</td>
                <td>
                  <button className="button" onClick={() => openModal(aproduct)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(aproduct)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminScreen;