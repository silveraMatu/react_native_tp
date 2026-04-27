# Refactorización: Implementación de useReducer en Register.jsx

Se ha realizado una refactorización del componente de registro para optimizar el manejo del estado y cumplir con los requerimientos técnicos de la materia.

## Cambios Realizados

### 1. Migración de useState a useReducer
Se eliminaron los múltiples estados independientes (`formData`, `error`, `isLoading`) y se centralizaron en un único **Reducer**. Esto permite que el componente tenga una única "fuente de verdad" y evita actualizaciones de estado fragmentadas.

### 2. Centralización de la Lógica (Reducer)
Se implementó una función reductora externa que gestiona las transiciones de estado mediante acciones claras:
- `FIELD_CHANGE`: Actualiza dinámicamente cualquier campo del formulario.
- `REGISTER_START`: Limpia errores previos y activa el estado de carga simultáneamente.
- `REGISTER_SUCCESS`: Finaliza el estado de carga tras un registro exitoso.
- `REGISTER_ERROR`: Captura el mensaje de error y desactiva el spinner de carga.