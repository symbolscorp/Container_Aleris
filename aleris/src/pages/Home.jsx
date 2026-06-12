import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGlobal } from "../context/GlobalContext";
import UserHeader from "../components/UserHeader";
import InscripcionCard from "../components/InscripcionCard";
import BottomNavigation from "../components/BottomNavigation";
import EmptyState from "../components/EmptyState";
import { SkeletonCard } from "../components/Loading";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { inscripciones, inscripcionesLoading, inscripcionesError, fetchInscripciones } = useGlobal();

  useEffect(() => {
    if (usuario?.id) fetchInscripciones(usuario.id);
  }, [usuario?.id]);

  return (
    <div className="page home-page">
      <div className="home-hero">
        <div className="home-hero__bg" />
        <UserHeader />
      </div>

      <div className="page-content">
        <div className="home-section-header">
          <h2>Mis Inscripciones</h2>
          <button className="btn btn--outline btn--sm" onClick={() => navigate("/eventos")}>
            + Ver Eventos
          </button>
        </div>

        {inscripcionesLoading && (
          <div className="skeleton-list">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {!inscripcionesLoading && inscripcionesError && (
          <div className="form-error">{inscripcionesError}</div>
        )}

        {!inscripcionesLoading && !inscripcionesError && inscripciones.length === 0 && (
          <EmptyState
            icon="🏐"
            title="Sin inscripciones"
            message="Aún no tienes eventos inscritos."
            actionLabel="Ver Eventos"
            actionRoute="/eventos"
          />
        )}
        
        {!inscripcionesLoading && inscripciones.length > 0 && (
  <div className="inscripciones-list">
    {Object.values(
      inscripciones.reduce((acc, ins) => {
        const key = ins.evento?.id;
        if (!acc[key]) {
          acc[key] = { ...ins, posiciones: [ins.numero] };
        } else {
          acc[key].posiciones.push(ins.numero);
        }
        return acc;
      }, {})
    ).map((ins) => (
      <InscripcionCard key={ins.evento?.id} inscripcion={ins} />
    ))}
  </div>
)}
        
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;
