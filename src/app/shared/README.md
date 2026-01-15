# Shared Module

## Descripción

El módulo Shared contiene componentes, directivas, pipes y modelos **reutilizables** que pueden ser utilizados por múltiples features. Este módulo se importa en los features que lo necesitan.

## Objetivo

Proporcionar elementos UI y utilidades comunes que se reutilizan en diferentes partes de la aplicación, manteniendo el código limpio y evitando duplicación.

## Qué Debería Contener

- **components/** - Botón, Modal, Card, Header, Footer, Alert, Pagination
- **directives/** - Highlight, Autofocus, ClickOutside, Debounce
- **pipes/** - SafeHtml, SafeUrl, Truncate, Currency, RelativeTime
- **models/** - Interfaces base (Entity, ApiResponse, Pagination)

## ✅ Reglas Importantes

- Componentes **agnósticos de dominio** (sin lógica de negocio específica)
- Se importa en cada feature que lo necesite
- Pueden tener dependencias de `core/`
- Deben estar bien documentados
