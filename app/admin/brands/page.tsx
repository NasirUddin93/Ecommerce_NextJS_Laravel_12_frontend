
"use client";

import { useEffect, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";

interface Brand {
  id: number;
  name: string;
  status: number;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loader, setLoader] = useState(false);

  const fetchBrands = async () => {
    try {
      setLoader(true);
      const res = await fetch(`${apiUrl}/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await res.json();
      setLoader(false);

      if (result.status === 200 && Array.isArray(result.data)) {
        setBrands(result.data);
      } else {
        console.error("Unexpected response:", result);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Brands</h1>
      {loader ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <div key={brand.id} className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">{brand.name}</h2>
                <p
                  className={`font-medium ${
                    brand.status === 1 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {brand.status === 1 ? "Active" : "Inactive"}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No brands found
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
