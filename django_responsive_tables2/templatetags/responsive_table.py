from django import template

register = template.Library()


@register.simple_tag(takes_context=True)
def responsive_table(context, table_template='django_responsive_tables2/basic_table.html'):
    pass
