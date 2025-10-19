# tours Specification

## Purpose
TBD - created by archiving change setup-full-backend-schema. Update Purpose after archive.
## Requirements
### Requirement: AI-Assisted Tour Creation
Система MUST предоставлять партнерам возможность создавать туры с помощью AI.

#### Scenario: Draft Creation
- **GIVEN** партнер предоставляет базовую информацию о туре (название, точки маршрута).
- **WHEN** он вызывает функцию создания тура.
- **THEN** система MUST:
  - Использовать AI для генерации полного описания и тегов.
  - Сохранить тур как документ в коллекции `tours` со статусом `draft`.

### Requirement: AI Tour Moderation
Система MUST автоматически проверять туры перед публикацией.

#### Scenario: Publishing a Tour
- **GIVEN** партнер отправляет тур на публикацию (статус `pending_moderation`).
- **WHEN** статус документа тура обновляется.
- **THEN** система MUST:
  - Запустить AI-проверку на анти-фрод и качество.
  - В случае успеха, изменить статус на `approved`.
  - В случае неудачи, изменить статус на `rejected` и добавить причину.

