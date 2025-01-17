import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Search, Filter } from 'lucide-react';

const PropertyList = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    bedrooms: 'all',
    category: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const properties = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      price: 850000,
      location: '123 Main St, City, State',
      bedrooms: 4,
      bathrooms: 3,
      area: '2,500',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      type: 'sale',
      category: 'villa',
    },
    {
      id: 2,
      title: 'Cozy Downtown Apartment',
      price: 2500,
      location: '456 Park Ave, City, State',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200',
      image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
      type: 'rent',
      category: 'apartment',
    },
    {
      id: 3,
      title: 'Seaside Family Home',
      price: 1200000,
      location: '789 Beach Rd, Coast City',
      bedrooms: 5,
      bathrooms: 4,
      area: '3,500',
      image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
      type: 'sale',
      category: 'house',
    },
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || property.type === filters.type;
    const matchesBedrooms = filters.bedrooms === 'all' || property.bedrooms === parseInt(filters.bedrooms);
    const matchesCategory = filters.category === 'all' || property.category === filters.category;
    const matchesPriceRange = filters.priceRange === 'all' || (() => {
      const price = property.price;
      switch(filters.priceRange) {
        case 'under-100k': return price < 100000;
        case '100k-500k': return price >= 100000 && price < 500000;
        case '500k-1m': return price >= 500000 && price < 1000000;
        case 'over-1m': return price >= 1000000;
        default: return true;
      }
    })();

    return matchesSearch && matchesType && matchesBedrooms && matchesCategory && matchesPriceRange;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-start md:items-center mb-6 gap-4 max-lg:justify-around">
        <h1 className="text-2xl font-bold">Properties</h1>
        <button
          onClick={() => navigate('/posts')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Property
        </button>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search properties by title,location..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white rounded-md shadow-md">
            <select
              className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            <select
              className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            >
              <option value="all">All Prices</option>
              <option value="under-100k">Under $100k</option>
              <option value="100k-500k">$100k - $500k</option>
              <option value="500k-1m">$500k - $1M</option>
              <option value="over-1m">Over $1M</option>
            </select>

            <select
              className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={filters.bedrooms}
              onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
            >
              <option value="all">All Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>

            <select
              className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="all">All Categories</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="condo">Condo</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
            onClick={() => navigate(`/posts/${property.id}`)}
          >
            <div className="relative h-48">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                property.type === 'sale' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
              }`}>
                For {property.type === 'sale' ? 'Sale' : 'Rent'}
              </span>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 truncate">{property.title}</h2>
              <p className="text-lg font-bold text-blue-600 mb-2">
                {property.type === 'sale' 
                  ? `$${property.price.toLocaleString()}`
                  : `$${property.price.toLocaleString()}/month`}
              </p>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin size={16} className="mr-1" />
                <p className="text-sm truncate">{property.location}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-gray-600">
                <div className="flex items-center">
                  <Bed size={16} className="mr-1" />
                  <span className="text-sm">{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath size={16} className="mr-1" />
                  <span className="text-sm">{property.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Square size={16} className="mr-1" />
                  <span className="text-sm">{property.area} sqft</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;