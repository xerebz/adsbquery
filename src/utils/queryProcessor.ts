import axios from 'axios';

interface Flight {
  icao24: string;
  callsign: string;
  origin_country: string;
  time_position: number;
  last_contact: number;
  longitude: number;
  latitude: number;
  baro_altitude: number;
  on_ground: boolean;
  velocity: number;
  true_track: number;
  vertical_rate: number;
  sensors: number[] | null;
  geo_altitude: number;
  squawk: string | null;
  spi: boolean;
  position_source: number;
}

const fetchFlights = async (): Promise<Flight[]> => {
  const response = await axios.get('https://opensky-network.org/api/states/all');
  return response.data.states.map((state: any[]) => ({
    icao24: state[0],
    callsign: state[1],
    origin_country: state[2],
    time_position: state[3],
    last_contact: state[4],
    longitude: state[5],
    latitude: state[6],
    baro_altitude: state[7],
    on_ground: state[8],
    velocity: state[9],
    true_track: state[10],
    vertical_rate: state[11],
    sensors: state[12],
    geo_altitude: state[13],
    squawk: state[14],
    spi: state[15],
    position_source: state[16],
  }));
};

const processQuery = async (query: string): Promise<any[]> => {
  const lowercaseQuery = query.toLowerCase();
  const flights = await fetchFlights();

  // Simple keyword-based filtering
  if (lowercaseQuery.includes('idaho')) {
    return flights.filter(flight => 
      flight.latitude > 42 && flight.latitude < 49 && 
      flight.longitude > -117 && flight.longitude < -111
    ).map(flight => ({
      callsign: flight.callsign.trim(),
      origin: flight.origin_country,
      destination: 'N/A', // OpenSky API doesn't provide destination
      altitude: Math.round(flight.baro_altitude),
    }));
  }

  // Add more keyword-based filters here for other locations or query types

  // Default: return all flights
  return flights.map(flight => ({
    callsign: flight.callsign.trim(),
    origin: flight.origin_country,
    destination: 'N/A',
    altitude: Math.round(flight.baro_altitude),
  }));
};

export { processQuery };