import click
import requests
from os import system as oss

__author__ = "Carion99"

dtypes = ['integer', 'string', 'text', 'float', 'real',
          'double', 'decimal', 'date', 'dateonly', 'json', 'uuid']


def get_entity():
    """get entity : Ask name of the entity"""
    entity = ""
    while entity == "":
        print("Enter name of entity : [Example: User]")
        entity = input(">>> ")

    return entity


def mat():
    """make attributes : Ask each name of the attributes and their datatypes and return it as a list"""

    name_attribute = ""
    dtype_attribute = ""

    while name_attribute == "":
        print("Enter name of attribute : [Example: Name] ")
        name_attribute = input(">>> ")

    while dtype_attribute not in dtypes:
        print("Enter datatype of attribute : [Default: string] ")
        dtype_attribute = input(">>> ").lower()
        if dtype_attribute == "":
            dtype_attribute = "string"

    return name_attribute, dtype_attribute


def make_entity(entity):
    cmd = "sequelize-cli model:generate --name {} --attributes ".format(entity)
    accord = True
    atts = []

    while accord:
        nat, dat = mat()
        while nat in atts:
            print("Attrubute is already defined")
            nat, dat = mat()

        if len(atts) == 0:
            s = "{}:{}".format(nat, dat)
        else:
            s = ",{}:{}".format(nat, dat)
        cmd += s
        atts.append(nat)
        print(atts)
        print(
            "Continue with attributes (y for yes, any for no) : [Default: y] ")
        saccord = input(">>> ")
        accord = True if saccord == "" or saccord == "y" else False
    print(cmd)
    oss(cmd)


def make_migrations():
    cmd = "sequelize-cli db:migrate"
    oss(cmd)


def make_database():
    cmd = "sequelize-cli db:create"
    oss(cmd)


def drop_database():
    cmd = "sequelize-cli db:drop"
    oss(cmd)


def initialize():
    cmd = "sequelize-cli init"
    oss(cmd)


def reset():
    print("Resetting...")
    print("Droping database...")
    drop_database()
    print("Creating database...")
    make_database()
    print("Migrating...")
    make_migrations()
    print("Done !")


@click.group()
def main():
    """
    Simple Python CLI to manipulate Sequelize-cli of NodeJs
    """
    pass


@main.command()
def mse():
    """ Create a new entity and his attributes without his name """
    entity = get_entity()
    make_entity(entity)


@main.command()
@click.argument('entity')
def mae(entity):
    """ Create a new entity and his attributes with his name """
    make_entity(entity)


@main.command()
def mig():
    """ Create the new migrations """
    # copy_migrations()
    make_migrations()


@main.command()
def mdb():
    """ Create the new database """
    make_database()


@main.command()
def ddb():
    """ Drop the database """
    drop_database()


@main.command()
def init():
    """ Initialize sequelize configuration in your project """
    initialize()


@main.command()
def res():
    """ Reset the database """
    reset()


if __name__ == "__main__":
    main()
