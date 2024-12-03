// import React from 'react'

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import PropTypes from "prop-types";
const CommonForm = ({formControls,formData,setFormData,onSubmit,buttonText}) => {

    function renderInputsByComponentType(formItem){
     let element = null;
     const value = formData[formItem.name]
     
     switch(formItem.componentType){
        case 'input':
            element = <Input name={formItem.name}  value={value} 
            onChange={
                (event)=>setFormData({
                    ...formData,
                    [formItem.name]:event.target.value
                })
            }
             id={formItem.name} placeholder={formItem.placeholder} type={formItem.type}/>
        break;
        case 'select':
            element = <Select onValueChange={(value)=>setFormData({
                ...formData,[formItem.name]:value
            })} value={value}>
                <SelectTrigger className="full">
                 <SelectValue placeholder={formItem.label}/>
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                    {
                  formItem.options && formItem.options.length> 0 ?   formItem.options.map((optionItem)=>(
                <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>
                    )):null
                    }
                </SelectContent>
            </Select>
        break;
        case 'textarea':
            element = <Textarea value={value}  onChange={
                (event)=>setFormData({
                    ...formData,
                    [formItem.name]:event.target.value
                })
            } name={formItem.name} placeholder={formItem.placeholder} id={formItem.id}/>
        break;

        default:
            element = <Input name={formItem.name}  onChange={
                (event)=>setFormData({
                    ...formData,
                    [formItem.name]:event.target.value
                })
            } id={formItem.name} placeholder={formItem.placeholder} type={formItem.type}/>
            break;

     }
     return element
    }
  return (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
{
  formControls?.map(formItem=> <div key={formItem.name} className="grid w-full gap-1.5">
    <Label className="mb-1">{formItem.label}</Label>
    {
        renderInputsByComponentType(formItem)
    }
  </div>)  
}
        </div>
        <Button type="submit" className = "mt-2 w-full bg-black text-white">{buttonText || 'Submit'}</Button>
    </form>
  )
}
CommonForm.propTypes = {
    formControls: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired, // Name of the form control
            label: PropTypes.string,          // Label for the form control
            placeholder: PropTypes.string,    // Placeholder for input/select
            type: PropTypes.string,           // Input type (for 'input' type controls)
            componentType: PropTypes.oneOf(["input", "select", "textarea"]).isRequired, // Type of the component
            options: PropTypes.arrayOf(       // Options (required for select)
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                    label: PropTypes.string.isRequired,
                })
            ),
        })
    ).isRequired,
    formData: PropTypes.object.isRequired, // Form data object
    setFormData: PropTypes.func.isRequired, // Function to update form data
    onSubmit: PropTypes.func.isRequired,    // Form submission handler
    buttonText: PropTypes.string,           // Text for the submit button
};
export default CommonForm