import React, { useEffect, useState } from "react";
import api from "../services/api";
import $ from "jquery";
import "datatables.net";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const loadProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
        if (products.length > 0) {
            if ($.fn.dataTable.isDataTable("#productsTable")) {
                $("#productsTable").DataTable().destroy();
            }
        }
        $('#productsTable').DataTable();
    }

    useEffect(() => {
        loadProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (window.confirm("deseja deletar este produto?")) {
            await api.delete(`/products/${id}`);
            loadProducts();
        }
    };

    return (
        <div className="container mt-4">
            <h2>Produtos</h2>
            <Button className="mb-3" onClick={() => navigate("/products/new")}>
                Novo Produto
            </Button>
            <table id="productsTable" className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Ativo</th>
                        <th>Criado em</th>
                        <th>Atuaizado em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nome}</td>
                            <td>R$ {p.preco}</td>
                            <td>{p.ativo ? "Sim" : "Não"}</td>
                            <td>{p.data_criacao}</td>
                            <td>{p.data_atualizacao}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2"
                                 onClick={() => navigate(`/products/edit/${p.id}`)}>
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" size="sm"
                                 onClick={() => deleteProduct(p.id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}