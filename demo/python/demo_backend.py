from pathlib import Path

from setuptools.build_meta import (
    build_wheel as setuptools_build_wheel,
    get_requires_for_build_wheel as setuptools_get_requires_for_build_wheel,
)


def _write_marker() -> None:
    Path(__file__).with_name("BUILD_RAN.txt").write_text(
        "THIS IS DEMO, a pip build hook ran. YOU ARE INFECTED!!! (Well could be).\n",
        encoding="utf-8",
    )


def get_requires_for_build_wheel(config_settings=None):
    _write_marker()
    return setuptools_get_requires_for_build_wheel(config_settings)


def build_wheel(wheel_directory, config_settings=None, metadata_directory=None):
    _write_marker()
    return setuptools_build_wheel(wheel_directory, config_settings, metadata_directory)
