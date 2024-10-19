import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section - Logo and Address */}
        <div >
          <img  src="https://drive.google.com/thumbnail?id=10mw3IFxDmqi-apQMCavaUowInlPYnW9-" alt="Hatil Logo" className="w-32 mb-4" />
          <p>8 Shewrapara, Rokeya Sarani, Mirpur, Dhaka-1216, Bangladesh.</p>
          <p className="mt-2">
            <span className="block">📞 +88 02 58054370</span>
            <span className="block">📱 +88 01713441000</span>
            <span className="block">✉️ info@urbanCraft.com</span>
          </p>
        </div>

        {/* The Company Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">THE COMPANY</h3>
          <ul>
            <li><a href="#" className="hover:underline">About URBAN CRAFT</a></li>
            <li><a href="#" className="hover:underline">License & Certificates</a></li>
            <li><a href="#" className="hover:underline">Work Completion Certificate</a></li>
            <li><a href="#" className="hover:underline">Career</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Return Policy</a></li>
            <li><a href="#" className="hover:underline">URBAN CRAFT Policies</a></li>
          </ul>
        </div>

        {/* Need Help? Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">NEED HELP?</h3>
          <ul>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Showroom Locator</a></li>
            <li><a href="#" className="hover:underline">Billing Terms & Conditions</a></li>
          </ul>
        </div>

        {/* More Information Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">MORE INFORMATION</h3>
          <ul>
            <li><a href="#" className="hover:underline">Company Profile</a></li>
            <li><a href="#" className="hover:underline">Be Our Franchisee</a></li>
            <li><a href="#" className="hover:underline">URBAN CRAFT Project Solution</a></li>
            <li><a href="#" className="hover:underline">Catalogues</a></li>
            <li><a href="#" className="hover:underline">URBAN CRAFT in News</a></li>
            <li><a href="#" className="hover:underline">Our Team</a></li>
          </ul>
        </div>
      </div>

      
    </footer>
  )
}

export default Footer
