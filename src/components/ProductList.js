// components/CityList.js
import React from 'react';

const ProductList = ({ products,  handleDelete}) => {
  return (
    <div className="row">
        <div className="col-sm-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-sm text-wrap">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Panjang</th>
                  <th>Tinggi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((matrix, index) => (
                  <tr key={matrix.id}>
                    <td>{matrix.id}</td>
                    <td>{matrix.panjang}</td>
                    <td>{matrix.tinggi}</td>
                    <td>
                      <a href={`matrix/${matrix.id}`}>Detail</a>
                      <button onClick={() => handleDelete(matrix.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default ProductList;
