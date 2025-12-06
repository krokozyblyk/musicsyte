#!/bin/bash
# Универсальный скрипт запуска - автоматически находит JAR файл
cd api-gateway || exit 1
JAR_FILE=$(find target -name "*.jar" -not -name "*.original" | head -1)
if [ -z "$JAR_FILE" ]; then
    echo "Error: JAR file not found in target/"
    exit 1
fi
echo "Starting with JAR: $JAR_FILE"
java -jar "$JAR_FILE"

