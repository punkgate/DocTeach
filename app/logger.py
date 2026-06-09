import logging

from app.config import LOG_LEVEL

logger = logging.getLogger("docteach")

logger.setLevel(LOG_LEVEL)

if not logger.handlers:

    handler = logging.StreamHandler()

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    handler.setFormatter(
        formatter
    )

    logger.addHandler(
        handler
    )