
"use client";
import { AutocompleteB } from "@blacksheepcode/example-react-autocomplete";


type TestItem = {
    id: number;
    name: string;
    description: string;
};

const mockItems: TestItem[] = [
    { id: 1, name: 'Apple', description: 'A red fruit' },
    { id: 2, name: 'Banana', description: 'A yellow fruit' },
    { id: 3, name: 'Cherry', description: 'A small red fruit' },
    { id: 4, name: 'Dragonfruit', description: 'A vibrant exotic fruit with a speckled interior' },
    { id: 5, name: 'Elderberry', description: 'Small dark berries often used in syrups' },
    { id: 6, name: 'Fig', description: 'A sweet, soft fruit with many seeds' },
    { id: 7, name: 'Grape', description: 'Small round fruit used for snacking and wine' },
    { id: 8, name: 'Honeydew', description: 'A sweet, pale green melon' },
    { id: 9, name: 'Indian Fig', description: 'Also known as prickly pear, a desert fruit' },
    { id: 10, name: 'Jackfruit', description: 'A large tropical fruit with sweet flesh' },
    { id: 11, name: 'Kiwi', description: 'A small fruit with fuzzy skin and bright green flesh' },
    { id: 12, name: 'Lemon', description: 'A tart yellow citrus fruit' },
    { id: 13, name: 'Mango', description: 'A juicy tropical stone fruit' },
    { id: 14, name: 'Nectarine', description: 'A smooth-skinned variety of peach' },
    { id: 15, name: 'Orange', description: 'A sweet citrus fruit' },
    { id: 16, name: 'Papaya', description: 'A soft, tropical fruit with orange flesh' },
    { id: 17, name: 'Quince', description: 'A yellow fruit often cooked into jams' },
    { id: 18, name: 'Raspberry', description: 'A small red berry with a tart-sweet flavor' },
    { id: 19, name: 'Strawberry', description: 'A popular red berry with a sweet taste' },
    { id: 20, name: 'Tomato', description: 'Botanically a fruit commonly used as a vegetable' },
    { id: 21, name: 'Ugli Fruit', description: 'A tangy citrus hybrid with rough skin' },
    { id: 22, name: 'Vanilla', description: 'A fragrant pod used for flavoring (technically an orchid fruit)' },
    { id: 23, name: 'Watermelon', description: 'A large, juicy melon with green rind and red flesh' },
    { id: 24, name: 'Xigua', description: 'Another name for watermelon, used in some regions' },
    { id: 25, name: 'Yuzu', description: 'A tart citrus used in Japanese cuisine' },
    { id: 26, name: 'Zucchini', description: 'A summer squash often treated as a vegetable' },
    { id: 27, name: 'Pineapple', description: 'A tropical fruit with sweet, juicy flesh and spiky skin' },
    { id: 28, name: 'Crabapple', description: 'A small tart apple often used for jams and preserves' },
    { id: 29, name: 'Apple Cider', description: 'A beverage made from pressed apples, often enjoyed warm or spiced' },
    { id: 30, name: 'Black Cherry', description: 'A dark-sweet cherry variety' },
    { id: 31, name: 'Maraschino Cherry', description: 'A preserved, sweet, bright red cherry used for desserts and cocktails' },
    { id: 32, name: 'Sour Cherry', description: 'A tart cherry commonly used in baking and preserves' },
    { id: 33, name: 'Concord Grape', description: 'A dark purple grape used for juice and jelly' },
    { id: 34, name: 'Grape Jelly', description: 'A sweet spread made from grapes' },
    { id: 35, name: 'Grapefruit', description: 'A large citrus fruit with a tangy, slightly bitter flavor' },
];


const searchFn = async (searchTerm: string, pageNumber: number) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!searchTerm) {

        return {
            items: [],
            pageMeta: {
                totalResults: 0,
                pageNumber: 1,
                resultsPerPage: 10,
            },
        };
    }

    const filteredItems = mockItems.filter(item =>
        (`item.name ${item.description}`).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        items: filteredItems,
        pageMeta: {
            totalResults: filteredItems.length,
            pageNumber: pageNumber,
            resultsPerPage: 10,
        },
    };
}
export function AutocompleteDemo() {
    return (
        <div>
            <AutocompleteB
                searchFn={searchFn}
                renderItem={(item) => <div>{item.name} - {item.description}</div>}
                itemKey="id"
                selectedValueDisplayStringFn={(item) => item.name}

            />
        </div>
    );
}
