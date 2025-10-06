"use client";

import { useState, useEffect } from "react";
import { apiUrl, adminToken } from "../../../common/http";

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface ProductForm {
  category_id: string;
  brand_id: string;
  name: string;
  sku: string;
  description: string;
  base_price: string;
  stock_quantity: string;
  weight: string;
  is_seasonal: boolean;
  seasonal_start_date: string;
  seasonal_end_date: string;
  status: "active" | "inactive";
}

export default function AddProduct() {
  const [form, setForm] = useState<ProductForm>({
    category_id: "",
    brand_id: "",
    name: "",
    sku: "",
    description: "",
    base_price: "",
    stock_quantity: "",
    weight: "",
    is_seasonal: false,
    seasonal_start_date: "",
    seasonal_end_date: "",
    status: "active",
  });

  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  // 📌 Fetch categories & brands on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch(`${apiUrl}/categories`, {
          headers: { Authorization: `Bearer ${adminToken()}` },
        });
        const catData = await catRes.json();
        setCategories(catData.data || catData);

        const brandRes = await fetch(`${apiUrl}/brands`, {
          headers: { Authorization: `Bearer ${adminToken()}` },
        });
        const brandData = await brandRes.json();
        setBrands(brandData.data || brandData);
      } catch (error) {
        console.error("Error fetching categories/brands:", error);
      }
    };
    fetchData();
  }, []);

  // 📌 Handle input change
const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof ProductForm;

    // If it's a checkbox, cast to HTMLInputElement
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm({ ...form, [key]: target.checked });
    } else {
      setForm({ ...form, [key]: value });
    }
  };


  // 📌 Handle image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  // 📌 Submit product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);
    console.log("Images:", images);

    try {
      // 1️⃣ Create product
      const res = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        return alert("Error: " + JSON.stringify(err));
      }

      const data = await res.json();
      const productId = data.data.id;

      // 2️⃣ Upload images
      for (const img of images) {
        const formData = new FormData();
        formData.append("product_id", productId.toString());
        formData.append("image_url", img); // your backend should handle file uploads
        formData.append("is_primary", "0");

        await fetch(`${apiUrl}/product-images`, {
          method: "POST",
          headers: { Authorization: `Bearer ${adminToken()}` },
          body: formData,
        });
      }

      alert("✅ Product created successfully!");
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        
        {/* Category Dropdown */}
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Brand Dropdown */}
        <select
          name="brand_id"
          value={form.brand_id}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">-- Select Brand --</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2" />
        <input name="sku" placeholder="SKU" onChange={handleChange} className="border p-2" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2" />
        <input name="base_price" placeholder="Base Price" onChange={handleChange} className="border p-2" />
        <input name="stock_quantity" placeholder="Stock Quantity" onChange={handleChange} className="border p-2" />
        <input name="weight" placeholder="Weight" onChange={handleChange} className="border p-2" />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_seasonal"
            checked={form.is_seasonal}
            onChange={handleChange}
          />
          Seasonal Product?
        </label>

        {form.is_seasonal && (
          <>
            <input
              type="date"
              name="seasonal_start_date"
              value={form.seasonal_start_date}
              onChange={handleChange}
              className="border p-2"
            />
            <input
              type="date"
              name="seasonal_end_date"
              value={form.seasonal_end_date}
              onChange={handleChange}
              className="border p-2"
            />
          </>
        )}

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <input type="file" multiple onChange={handleImageChange} className="border p-2" />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
