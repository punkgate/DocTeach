import logging
import os

from app.config import LOG_LEVEL


os.makedirs(
    "logs",
    exist_ok=True
)

logger = logging.getLogger(
    "docteach"
)

logger.setLevel(
    LOG_LEVEL
)

if not logger.handlers:

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    console_handler = logging.StreamHandler()

    console_handler.setFormatter(
        formatter
    )

    file_handler = logging.FileHandler(
        "logs/app.log"
    )

    file_handler.setFormatter(
        formatter
    )

    logger.addHandler(
        console_handler
    )

    logger.addHandler(
        file_handler
    )