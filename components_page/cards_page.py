from pathlib import Path

from .helpers import ExampleContainer, HighlightedSource
from .api_doc import ApiDoc
from .metadata import load_metadata

from .components.cards.simple import cards as cards_simple
from .components.cards.content_types import cards as cards_content_types
from .components.cards.group import cards as cards_group
from .components.cards.columns import cards as cards_columns

HERE = Path(__file__).parent
CARDS = HERE / "components" / "cards"

cards_simple_source = (CARDS / "simple.py").open().read()
cards_content_type_source = (
    (CARDS / "content_types.py").open().read()
)
cards_group_source = (CARDS / "group.py").open().read()
cards_columns_source = (CARDS / "columns.py").open().read()

component_metadata = load_metadata()

page = [
    ExampleContainer(cards_simple),
    HighlightedSource(cards_simple_source),
    ExampleContainer(cards_content_types),
    HighlightedSource(cards_content_type_source),
    ExampleContainer(cards_group),
    HighlightedSource(cards_group_source),
    ExampleContainer(cards_columns),
    HighlightedSource(cards_columns_source),
    ApiDoc(
        component_metadata.get("src/components/card/CardDeck.js"),
        component_name="CardDeck",
    ),
    ApiDoc(
        component_metadata.get("src/components/card/CardGroup.js"),
        component_name="CardGroup",
    ),
    ApiDoc(
        component_metadata.get(
            "src/components/card/CardColumns.js"
        ),
        component_name="CardColumns",
    ),
    ApiDoc(
        component_metadata.get("src/components/card/Card.js"),
        component_name="Card",
    ),
    ApiDoc(
        component_metadata.get(
            "src/components/card/CardHeader.js"
        ),
        component_name="CardHeader",
    ),
    ApiDoc(
        component_metadata.get("src/components/card/CardBody.js"),
        component_name="CardBody",
    ),
    ApiDoc(
        component_metadata.get(
            "src/components/card/CardFooter.js"
        ),
        component_name="CardFooter",
    ),
    ApiDoc(
        component_metadata.get("src/components/card/CardTitle.js"),
        component_name="CardTitle",
    ),
    ApiDoc(
        component_metadata.get(
            "src/components/card/CardSubtitle.js"
        ),
        component_name="CardSubtitle",
    ),
    ApiDoc(
        component_metadata.get("src/components/card/CardLink.js"),
        component_name="CardLink",
    ),
    ApiDoc(
        component_metadata.get("src/components/card/CardImg.js"),
        component_name="CardImg",
    ),
    ApiDoc(
        component_metadata.get(
            "src/components/card/CardImgOverlay.js"
        ),
        component_name="CardImgOverlay",
    ),
]