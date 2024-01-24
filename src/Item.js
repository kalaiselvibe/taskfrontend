import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./item.css"
import Table from 'react-bootstrap/Table';
const Item = () => {
    function refreshPage(){ 
        window.location.reload(); 
    }
    const [headerData, setHeaderData] = useState({
        sv: '', 
        svDate: new Date().toISOString().split`T`[0],
        acNum: 'UNPLUGAPPS',
        status: 'A',
        total: '',
      });
    
      const [detailsData, setDetailsData] = useState([
        {
          productCode: '',
          productName: '',
          productPrice: '',
          quantity: '',
          total: '',
        },
      ]);
    
      const handleHeaderChange = (e) => {
        setHeaderData({ ...headerData, [e.target.name]: e.target.value });
      };
    
      const handleDetailsChange = (index, e) => {
        const newDetails = [...detailsData];
        newDetails[index][e.target.name] = e.target.value;
    
        // Calculate total
        const quantity = parseFloat(newDetails[index].quantity);
        const productPrice = parseFloat(newDetails[index].productPrice);
        newDetails[index].total = (quantity * productPrice).toFixed(2);
    
        setDetailsData(newDetails);
      };
    
      const handleProductCodeChange = async (index, productCode) => {
        try {
          const response = await axios.get(`http://localhost:3001/api/products/${productCode}`);
          const { name, price } = response.data;
    
          const newDetails = [...detailsData];
          newDetails[index].productName = name;
          newDetails[index].productPrice = price;
    
          // Calculate total
          const quantity = parseFloat(newDetails[index].quantity);
          newDetails[index].total = (quantity * price).toFixed(2);
    
          setDetailsData(newDetails);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
    
      const handleAddRow = () => {
        setDetailsData([...detailsData, { productCode: '', productName: '', productPrice: '', quantity: '', total: '' }]);
      };
    
      const handleSubmit = async () => {
        try {
          // Format the date in 'YYYY-MM-DD' before sending it to the backend
          const formattedDate = new Date(headerData.svDate).toISOString().split`T`[0];
    
          // Calculate total for the header based on detailsData
          const total = detailsData.reduce((acc, detail) => acc + parseFloat(detail.total), 0);
    
          const response = await axios.post('http://localhost:3001/api/submitData', {
            header: { ...headerData, svDate: formattedDate, total },
            details: detailsData,
          });
    
          console.log('Data submitted. Header ID:', response.data.sv);
    
          // Assuming you have the sv value after submission
          fetchData(response.data.sv);
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      };
    
      const fetchData = async (sv) => {
        try {
          const response = await axios.get(`http://localhost:3001/api/getData/${sv}`);
          const { headerData, detailsData } = response.data;
    
          setHeaderData(headerData);
          setDetailsData(detailsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        // If you have an initial sv value, you can call fetchData here
        // fetchData(initialSv);
      }, []);
    
  return (
    <div>
        <div className='container-fluid'>
            <div className='row' >
                <div className='col-11' style={{backgroundColor:"#ededed",border:'1px solid black',maxHeight:"800px"}}>
                 
                   <div className='row'>
                        <h5 style={{backgroundColor:"yellow",border:'1px solid yellow',maxHeight:"28px",textAlign:'center'}}>Header</h5>
                        <div className='col'>
                         <label>Vr.No:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>   
                         <input type="text" name="sv" value={headerData.sv} onChange={handleHeaderChange} />
                        </div>
                        <div className='col'>
                        <label>Vr.Date:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>   
                        <input type="text" name="svDate"    value={headerData.svDate} onChange={handleHeaderChange} />
                        </div>
                        <div className='col'>
                        <label>Status &nbsp;</label>   
                        <input type="text" name="status" value={headerData.status} onChange={handleHeaderChange} />
                        </div>
                        
                    </div>
                    <br/>
                    <br/>
                    <div className='row'>
                        <div className='col-8'>
                         <label>Ac Name:- &nbsp;</label>   
                         <input type="text" style={{width:"73%"}} name="acNum" value={headerData.acNum} onChange={handleHeaderChange} />
          
                        </div>
                        <div className='col-4'>
                        <label>Ac Amt &nbsp;</label>   
                        <input type="text" name="total" value={headerData.total} onChange={handleHeaderChange} />
                        </div>
                       
                    </div>
                    <br/>
                    <br/>
                   <div className='row'>
                    <h5 style={{backgroundColor:"#F7EEC4",border:'1px solid #F7EEC4',maxHeight:"28px",textAlign:'center'}}>Detail</h5>
                    <div style={{ marginTop: 24, marginLeft: 12 }}>
      <Table className="custom-table" >
        <thead className="custom-header">
          <tr>
            <th>Sr.NO</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {detailsData.map((detail, index) => (
            <tr key={index}>
 <td>
            <input
                type="text"
                
                value={index + 1}
              
              />
              </td>
           <td>
           <input
                type="text"
                name="productCode"
                value={detail.productCode}
                onChange={(e) => handleDetailsChange(index, e)}
                onBlur={(e) => handleProductCodeChange(index, e.target.value)}
              />
           </td>
              
          
            <td>
            <input
                type="text"
                name="productName"
                value={detail.productName}
                onChange={(e) => handleDetailsChange(index, e)}
                disabled
              />
            </td>
             
         
        
          <td>
          <input
                type="text"
                name="productPrice"
                value={detail.productPrice}
                onChange={(e) => handleDetailsChange(index, e)}
                disabled
              />
          </td>
              
         
         
             <td>
             <input type="text" name="quantity" value={detail.quantity} onChange={(e) => handleDetailsChange(index, e)} />
             </td>
             
            <td>
            <input type="text" name="total" value={detail.total} onChange={(e) => handleDetailsChange(index, e)} disabled />
            </td>
            
             
            
          </tr>

        
              
           
          ))}
           <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
           
            <td style={{textAlign:'right',fontWeight:'bold'}}>Total :</td>
           <td> <input type="text" name="total" value={headerData.total} onChange={handleHeaderChange} /></td>
        </tr>
        </tbody>
       
       
        
      </Table>
    </div>
                   </div>
                   
                   
                </div>
                <div className='col-1' style={{backgroundColor:"#ededed",maxHeight:"280px"}}>
<div className='row' style={{backgroundColor:"#F7EEC4",border:'1px solid #F7EEC4',maxHeight:"28px",marginTop:'50px'}}>

    <button style={{backgroundColor:"#F7EEC4",border:'1px solid #F7EEC4',maxHeight:"28px"}} onClick={ refreshPage }>New</button>
    <br/>
    <button style={{backgroundColor:"#F7EEC4",border:'1px solid #F7EEC4',maxHeight:"28px"}} onClick={handleAddRow}>Insert</button>  <br/>
    <button style={{backgroundColor:"#F7EEC4",border:'1px solid #F7EEC4',maxHeight:"28px"}} onClick={handleSubmit}>Save</button>  <br/>
    <button style={{backgroundColor:"#F7EEC4",border:'1px solid #F7EEC4',maxHeight:"28px"}}>Print</button>  <br/>
</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Item