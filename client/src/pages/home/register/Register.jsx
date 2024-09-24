import React, { useEffect, useRef, useState } from "react";
import { Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'; 
import './register.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../features/authentication/authSlice';
import axios from 'axios'; // Import axios for image upload

const Register = () => {

  const {user} = useSelector(state=>state.auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [avatar, setAvatar] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);  // State for the image file
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL); // Update the preview URL
      setAvatar(file); // Store the file to upload to Cloudinary
    }
  };

  
  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'qwerasd1'); // Cloudinary upload preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dqrzori6j/image/upload', 
        formData
      );
      return response.data.secure_url; // Return the image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleSignUp = async () => {
    if (!username || !email || !password) {
        alert('Please fill all fields.');
        return;
    }

    setIsLoading(true);

    try {
      let avatarUrl = '';

      if (avatar) {
        avatarUrl = await uploadImageToCloudinary(avatar); // Upload image if selected
      }

      // Create an object to send as JSON, including the uploaded image URL
      const userData = {
        username,
        email,
        password,
        avatar: avatarUrl, // Include image URL
      };

      await dispatch(registerUser(userData)).unwrap(); // Dispatch the action
      alert('Sign up successful!');

      // Clear the form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setAvatar(null); // Clear the image

      // Redirect to login page
      navigate('/main');
    } catch (error) {
      console.error('Error during registration:', error); // Log error details
      const errorMessage = error.message || 'Sign up failed.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="register-form">
      <h3>Create an account</h3>
      <form onSubmit={(e) => e.preventDefault()}>
      <div className="image-upload">
      <label htmlFor="file-input" className=" d-flex gap-2  upload-label">
        <div className=" image-placeholder">
          {/* Display preview image or placeholder */}
          {imagePreview ? (
            <img src={imagePreview} alt="Selected" className="preview-image" />
          ) : (
            <img src="/avatar.png" alt="Placeholder" className="preview-image" />
          )}
        </div>
        <p>Upload your picture</p>
      </label>

      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange} // Handle image change
        className="file-input"
      />
    </div>
        <input
          className='form-control mb-4'
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <input
          className='form-control mb-4'
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className='form-control mb-4'
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Button
          onClick={handleSignUp}
          className={`w-100 px-3 py-2 rounded text-white my-2 border-0 fw-bold ${isLoading ? 'bg-secondary' : 'bg-primary'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
};

export default Register;
