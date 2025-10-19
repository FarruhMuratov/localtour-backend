# authentication Specification

## Purpose
TBD - created by archiving change setup-full-backend-schema. Update Purpose after archive.
## Requirements
### Requirement: User Roles
Система MUST поддерживать три роли пользователей: `client`, `partner`, `admin`.

#### Scenario: Role Assignment
- **GIVEN** новый пользователь создается.
- **WHEN** роль не указана явно.
- **THEN** система MUST присвоить ему роль `client` по умолчанию.

### Requirement: Partner Profile
Система MUST хранить расширенную информацию о партнерах в отдельной коллекции.

#### Scenario: Partner Creation
- **GIVEN** пользователь создан с ролью `partner`.
- **WHEN** документ пользователя создан в Firestore.
- **THEN** система MUST автоматически создать связанный документ в коллекции `partners` со статусом `pending` (ожидает заполнения данных).

