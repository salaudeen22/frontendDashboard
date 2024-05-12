
import React, { useState,useEffect } from "react";
import { universalurl } from "../Utils/helper";
import Swal from "sweetalert2";


function BlockResist({ data }) {
  const [List, setList] = useState([]);

  useEffect(() => {
    if (data && data.restrict) {
      setList(data.restrict);
    }
  }, [data]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    timeInHours: "",
    type: "Restrict",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const Modal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem("userEmail");
      const dataToSend = {
        email: email,
        restrict: {
          url: formData.url,
          timeInHours: formData.timeInHours,
          type: formData.type,
        },
      };

      const response = await fetch(`${universalurl}api/restrictblock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const json = await response.json();

      if (!json.success) {
        alert("Enter valid credentials");
      }

      if (json.success) {
        Swal.fire({
          title: "Added Succesfully!",
        
          icon: "success",
        });
        setShowModal(false);
       
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeRestrict = async (index) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const email = localStorage.getItem("userEmail");
          const itemToRemove = List[index];
          const response = await fetch(
            `${universalurl}api/removefromrestrict`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, itemToRemove }),
            }
          );
    
          const json = await response.json();
    
          if (!json.success) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to remove item from restrict list",
            });
          
          } else {
            Swal.fire({
              title: "Removed Succesfully!",
            
              icon: "success",
            });
            const newList = [...List];
            newList.splice(index, 1);
            setList(newList);
            
          }
        
        }
      });
    
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while removing item from restrict list");
    }
  };

  if (!data || !data.screendata || data.screendata.length === 0) {
    return <div>No screen data available</div>;
  }

  return (
    <div className="ResistedBox">
      <div className="rtitle">
        <h3>Block and Restrict List</h3>
        <button onClick={Modal}>Add</button>
      </div>
      <hr />
      <div className="list">
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <span className="close" onClick={Modal}>
                &times;
              </span>
              <form onSubmit={handleSubmit}>
                <div className="form-input">
                  <input
                    type="text"
                    name="url"
                    placeholder="Enter the URL"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-input">
                  <input
                    type="number"
                    name="timeInHours"
                    placeholder="Enter the time in Hours"
                    value={formData.timeInHours}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-input">
                  <select
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="Restrict">Restrict</option>
                    <option value="Block">Block</option>
                  </select>
                </div>
                <div className="form-input">
                  <button type="submit">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {List.length?(<table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Time In Hours</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            
            {List.map((item, index) => (
              <tr key={index} onClick={() => removeRestrict(index)}>
                <td>
                  <a href={item.url}>{item.url}</a>
                </td>
                <td>{item.timeInHours}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>):(<div style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          opacity:0.7
        }}>Add new Restriction to List</div>)}
        
      </div>
    </div>
  );
}

export default BlockResist;
