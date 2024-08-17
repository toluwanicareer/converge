export interface Document {
  id: string;
  title: string;
  creator: string;
}

export interface Attendee {
  id: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  image: string;
}

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const jsonData: T = await response.json();
  return jsonData;
};