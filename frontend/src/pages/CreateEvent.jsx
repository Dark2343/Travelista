import React, { useState } from 'react';
import axios from '../services/api';
import Loading from '../components/Loading';
import DatePicker from 'react-datepicker';
import TimeInput from '../components/TimeInput';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from '../components/Dropdown';

export default function CreateEvent() {
  
  // State variables for form inputs
  const [currentDate, setCurrentDate] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setEventLocation] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date(); // Prevent selecting past dates

  const handleAddImage = () => {
    const url = prompt('Enter image URL:');
    if (url) setImage(url);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);  // update the time
  };

  const handleCategorySelect = (category) => {
    setCategory(category);  // update the category
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);  // update the input value
  };
  
  // Handle form submission
  const createEvent = async (eventData) => {
    setLoading(true);
    try {      
      console.log('Event data:', eventData);
      const response = await axios.post('/events', JSON.stringify(eventData), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE3MDgyMzk0ODQ4ZGRjZGZlNTg1YSIsImVtYWlsIjoibW9oYW1lZDIwMDNlbGFzaG1hd3lAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ3MTk5ODE5LCJleHAiOjE3NDcyMDM0MTl9.B_GoyQcJw5KWzI4rrKzvAdt8tqsQOmz5tXRndosVgqo'}
        });
      console.log('Event created successfully:', response.data);
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = () => {
    const formattedTags = tags
      .trim()  // remove any extra spaces around
      .split(/\s+/)  // Split by any whitespace (multiple spaces or single space)
      .filter(tag => tag.length > 0)  // remove empty strings if there are multiple spaces
    
    const formattedPrice = parseInt(price);  // or parseInt(price) if it's an integer

    const eventData = {
        "title": title,
        "image": image,
        "location" : location,
        "startDate": currentDate,
        "endDate": endDate,
        "time": time,
        "price": formattedPrice,
        "description": description,
        "category": category,
        "tags": formattedTags,
      };
        
      console.log('Event data:', eventData);

      createEvent(eventData);
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className='relative z-0'>
        {/* Blurred circle background */}
        <div className="absolute w-[500px] h-[450px] rounded-full bg-[#049663] blur-[300px] dark:bg-white dark:blur-[500px] dark:opacity-70 left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
        
        {/* Main content should be above the blur */}
        <div className='relative z-10 flex items-start'>
            <div className="w-1/2 h-[630px] ml-12 bg-gray-300 dark:bg-[#4F8E78] rounded-4xl flex justify-center border border-gray-500 shadow-xl items-center overflow-hidden cursor-pointer" onClick={handleAddImage}>
                {/* Image Side */}
                {image ? (
                    <img src={image} alt={<Loading/>}
                    className="w-full h-full object-cover"
                    onError={() => { alert('Invalid image URL'); setImage(null);}}/>):
                    (<div className="flex flex-col items-center text-black">
                    <div className="text-3xl bg-gray-500 dark:bg-[#2D6350] text-gray-900 dark:text-white rounded-lg px-4 py-2">+</div>
                    <div className="mt-2 text-lg font-medium dark:text-white">Add Cover Image</div>
                </div>)}
            </div>


            {/* Text Side */}
            <div className='flex flex-col ml-8 mt-10'>
                
                {/* Title and Location Fields */}
                <div className ='flex justify-between gap-4 mb-5'>
                  <input
                      type="text"
                      placeholder="Event Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-[350px] h-[50px] bg-transparent text-gray-700 dark:text-gray-300 font-inter rounded-xl border-2 border-gray-400 px-3 mb-4
                      placeholder-gray-500 dark:placeholder-gray-400 placeholder:font-inter
                      focus:ring-2 focus:outline-none focus:border-green-600 focus:ring-green-600
                      dark:focus:border-gray-100 dark:focus:ring-gray-100 transition"/>
                  <input
                      type="text"
                      placeholder="Event Location"
                      value={location}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-[350px] h-[50px] bg-transparent text-gray-700 dark:text-gray-300 font-inter rounded-xl border-2 border-gray-400 px-3 mb-4
                              placeholder-gray-500 dark:placeholder-gray-400 placeholder:font-inter
                              focus:ring-2 focus:outline-none focus:border-green-600 focus:ring-green-600
                              dark:focus:border-gray-100 dark:focus:ring-gray-100 transition"/>
                </div>

                {/* Start and End Date Pickers */}
                <div className='flex justify-between mb-5'>
                    <DatePicker
                      selected={currentDate}
                      onChange={(date) => setCurrentDate(date)}
                      minDate={today}
                      placeholderText="Start Date"
                      className="w-full h-[50px] bg-transparent text-gray-700 dark:text-gray-300 font-inter rounded-xl border-2 border-gray-400 px-3 py-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-green-600 focus:ring-green-600 dark:focus:border-gray-100 dark:focus:ring-gray-100 transition"
                    />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      minDate={today}
                      placeholderText="End Date"
                      className="w-full h-[50px] bg-transparent text-gray-700 dark:text-gray-300 font-inter rounded-xl border-2 border-gray-400 px-3 py-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-green-600 focus:ring-green-600 dark:focus:border-gray-100 dark:focus:ring-gray-100 transition"
                    />
                  {/* Time Picker */}
                  <TimeInput value={time} onChange={handleTimeChange}/>
                </div>
                
                {/* Description Field*/}
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-[190px] bg-transparent text-gray-700 dark:text-gray-300 font-inter rounded-xl border-2 border-gray-400 px-3 mb-10
                            placeholder-gray-500 dark:placeholder-gray-400 placeholder:font-inter pt-2 
                            focus:ring-2 focus:outline-none focus:border-green-600 focus:ring-green-600
                            dark:focus:border-gray-100 dark:focus:ring-gray-100 transition
                            overflow-hidden resize-none"/>

                {/* Tags and Categories */}
                <div className='flex justify-between'>
                  <input
                      type="number"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-[200px] h-[50px] bg-transparent text-gray-700 dark:text-gray-300 font-inter rounded-xl border-2 border-gray-400 px-3 mb-4
                              placeholder-gray-500 dark:placeholder-gray-400 placeholder:font-inter
                              focus:ring-2 focus:outline-none focus:border-green-600 focus:ring-green-600
                              dark:focus:border-gray-100 dark:focus:ring-gray-100 transition
                              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                  <Dropdown selectedCategory={category} onCategoryChange={handleCategorySelect}/>
                  <input
                      type="text"
                      placeholder="Tags (Space separated)"
                      value={tags}
                      onChange={handleTagsChange}
                      className="w-[220px] h-[50px] bg-transparent text-gray-700 dark:text-gray-300 font-inter rounded-xl border-2 border-gray-400 px-3 mb-4
                      placeholder-gray-500 dark:placeholder-gray-400 placeholder:font-inter
                      focus:ring-2 focus:outline-none focus:border-green-600 focus:ring-green-600
                      dark:focus:border-gray-100 dark:focus:ring-gray-100 transition"/>
                </div>

                {/* Book Now Button */}
                <button className="py-3 w-1/2 mx-auto mt-15 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                  onClick={handleSubmit}>
                    {loading ? <Loading/> : 'Create Event'}
                </button>
            </div>
        </div>
    </div>
  );
};