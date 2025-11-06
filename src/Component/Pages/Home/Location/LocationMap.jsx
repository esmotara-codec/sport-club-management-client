import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationMap() {
  return (
    <section className="max-w-6xl mx-auto px-4 my-12">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        📍 Our Location
      </h2>

      {/* Map */}
      <MapContainer
        center={[23.8103, 90.4125]} // Dhaka
        zoom={15}
        className="h-80 w-full rounded-2xl shadow-lg"
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[23.8103, 90.4125]}>
          <Popup>Sport Club, Dhaka</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
