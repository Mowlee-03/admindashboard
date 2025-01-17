import React from 'react';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

const ViewPost = ({ property }) => {
  // Mock data for demonstration
  const mockProperty = {
    id: 1,
    title: 'Modern Luxury Villa',
    price: '$850,000',
    location: '123 Main St, City, State',
    description: 'Beautiful modern villa with stunning views and premium finishes throughout. Features include a gourmet kitchen, spacious living areas, and a private backyard.',
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    area: '2,500',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
    ],
    
  };

  const displayProperty = property || mockProperty;

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <div className="relative h-96">
              <img
                src={displayProperty.images[0]}
                alt={displayProperty.title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {displayProperty.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property view ${index + 2}`}
                  className="h-24 w-full object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">{displayProperty.title}</h1>
            <p className="text-3xl font-bold text-blue-600 mb-4">
              {displayProperty.price}
            </p>

            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={20} className="mr-2" />
              {displayProperty.location}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Bed size={20} className="mr-2 text-gray-600" />
                <span>{displayProperty.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath size={20} className="mr-2 text-gray-600" />
                <span>{displayProperty.bathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <Square size={20} className="mr-2 text-gray-600" />
                <span>{displayProperty.area} sqft</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{displayProperty.description}</p>
            </div>

            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;