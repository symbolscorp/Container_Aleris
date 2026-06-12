import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEventosActivos } from "../api/eventoApi";
import EventoCard from "../components/EventoCard";
import BottomNavigation from "../components/BottomNavigation";
import { SkeletonCard } from "../components/Loading";
import EmptyState from "../components/EmptyState";
import "../styles/Eventos.css";

const Eventos = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Guarda qué clubs están abiertos. Por defecto todos abiertos.
  const [abiertos, setAbiertos] = useState({});

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await getEventosActivos();
        const data = res.data || [];
        setEventos(data);
        // Abrir todos los grupos por defecto
        const iniciales = {};
        data.forEach((ev) => {
          const club = ev.club?.descripcion ?? "Sin club";
          iniciales[club] = true;
        });
        setAbiertos(iniciales);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, []);

  // Agrupar eventos por club
  const grupos = eventos.reduce((acc, ev) => {
    const club = ev.club?.descripcion ?? "Sin club";
    if (!acc[club]) acc[club] = [];
    acc[club].push(ev);
    return acc;
  }, {});

  const toggleClub = (club) =>
    setAbiertos((prev) => ({ ...prev, [club]: !prev[club] }));

  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("/home")}>←</button>
        <h1>Eventos</h1>
        <span className="eventos-count">{eventos.length} activos</span>
      </div>

      <div className="page-content">
        {loading && (
          <div className="skeleton-list">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        )}
        {!loading && error && <div className="form-error">{error}</div>}
        {!loading && !error && eventos.length === 0 && (
          <EmptyState icon="🏐" title="Sin eventos" message="No hay eventos activos en este momento." />
        )}

        {!loading && eventos.length > 0 && (
          <div className="clubes-list">
            {Object.entries(grupos).map(([club, evs]) => {
              const abierto = abiertos[club];
              return (
                <div key={club} className="club-grupo">

                  {/* ── Header del acordeón ── */}
                  <button
                    className="club-grupo__header"
                    onClick={() => toggleClub(club)}
                    aria-expanded={abierto}
                  >
                    <div className="club-grupo__info">
                      <span className="club-grupo__trophy">🏆</span>
                      <div>
                        <span className="club-grupo__nombre">{club}</span>
                        <span className="club-grupo__sub">
                          {evs.length} evento{evs.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <span className={`club-grupo__chevron ${abierto ? "club-grupo__chevron--open" : ""}`}>
                      ›
                    </span>
                  </button>

                  {/* ── Eventos del club ── */}
                  {abierto && (
                    <div className="club-grupo__eventos">
                      {evs.map((ev) => (
                        <EventoCard key={ev.id} evento={ev} />
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Eventos;
