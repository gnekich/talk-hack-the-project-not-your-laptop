from pathlib import Path

from setuptools.build_meta import (
    build_wheel as setuptools_build_wheel,
    get_requires_for_build_wheel as setuptools_get_requires_for_build_wheel,
)


def _write_marker() -> None:
    from datetime import datetime, timezone

    timestamp = datetime.now(timezone.utc).isoformat().replace("T", " ").replace("Z", " UTC")

    Path(__file__).with_name("INFECTED_BUILD_RAN.txt").write_text(
        f"""THIS IS DEMO, a pip build hook ran.

YOU ARE INFECTED!!! (Well could be).

All your secrets belong to us!

Time: {timestamp}
        """,
        encoding="utf-8",
    )


def get_requires_for_build_wheel(config_settings=None):
    _write_marker()
    return setuptools_get_requires_for_build_wheel(config_settings)


def build_wheel(wheel_directory, config_settings=None, metadata_directory=None):
    _write_marker()
    return setuptools_build_wheel(wheel_directory, config_settings, metadata_directory)
