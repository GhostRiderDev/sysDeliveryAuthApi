#!/usr/bin/env bash

readonly SRC_PATH="src/user"

readonly DOMAIN_DIRECTORY_PATH="${SRC_PATH}/domain"
readonly APPLICATION_DIRECTORY_PATH="${SRC_PATH}/application"

readonly UNAUTHORIZED_IMPORTS_IN_APPLICATION="infrastructure|nestjs"
readonly UNAUTHORIZED_IMPORTS_IN_DOMAIN="${UNAUTHORIZED_IMPORTS_IN_APPLICATION}|application"

readonly UNAUTHORIZED_IMPORTS_COUNT_IN_DOMAIN=$(find ${DOMAIN_DIRECTORY_PATH} -path "*/node_modules/*" -prune -o -name "*.ts" -exec egrep -w ${UNAUTHORIZED_IMPORTS_IN_DOMAIN} {} \; | wc -l)
readonly UNAUTHORIZED_IMPORTS_COUNT_IN_USE_CASES=$(find ${APPLICATION_DIRECTORY_PATH} -path "*/node_modules/*" -prune -o -name "*.ts" -exec egrep -w ${UNAUTHORIZED_IMPORTS_IN_APPLICATION} {} \; | wc -l)

if [[ "${UNAUTHORIZED_IMPORTS_COUNT_IN_DOMAIN}" -eq 0 ]] && [[ "${UNAUTHORIZED_IMPORTS_COUNT_IN_USE_CASES}" -eq 0 ]]; then
  exit 0
fi

echo "${UNAUTHORIZED_IMPORTS_COUNT_IN_DOMAIN} unauthorized imports in ${DOMAIN_DIRECTORY_PATH}:"
find ${DOMAIN_DIRECTORY_PATH} -path "*/node_modules/*" -prune -o -name "*.ts" -exec egrep -lw ${UNAUTHORIZED_IMPORTS_IN_DOMAIN} {} \;
echo ""
echo "${UNAUTHORIZED_IMPORTS_COUNT_IN_USE_CASES} unauthorized imports in ${APPLICATION_DIRECTORY_PATH}:"
find ${APPLICATION_DIRECTORY_PATH} -path "*/node_modules/*" -prune -o -name "*.ts" -exec egrep -lw ${UNAUTHORIZED_IMPORTS_IN_APPLICATION} {} \;
exit 1