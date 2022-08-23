import React from "react";


const Auth = (props) => {

  return (
<form onSubmit={onFormSubmit} className="flex flex-col bg-gray-200 gap-6 rounded-xl p-4">
    <legend className="text-center font-bold">Contact Info</legend>
    <span className="text-red-600 text-sm">* Our staff will contact you soon to confirm the order and help you make a payment.</span>
    <div className="flex flex-col gap-3">
  <label>
    Name: 
    <input type="text" name="name" required/>
  </label>
    <label>
    Phone number: 
    <input type="text" name="phone" required />
  </label>
    <label>
    Email Address: 
    <input type="text" name="email" required />
  </label>
    </div>

  <input className="bg-slate-800 text-white rounded-xl py-2" type="submit" value="Place an Order" />
</form>
  );
};

export default Auth;
