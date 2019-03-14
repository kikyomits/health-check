const color = 'Primary';

function test(color) {
    return new Promise((resolve, reject) => {
            const response = {};
            response['application/json'] = {
                "message": "success",
                "errors": [],
                "response": {}
            };
            let body = {};
            if (color === "Primary") {
                body = {
                    "primary": {
                        "base-color": "#000000",
                        "main-color": "#000000",
                        "accent-color": "#000000"
                    },
                    "secondary": {
                        "base-color": "#000000",
                        "main-color": "#000000",
                        "accent-color": "#000000"
                    }
                };
            }
            else {
                body = {
                    "primary": {
                        "base-color": "#000000",
                        "main-color": "#000000",
                        "accent-color": "#000000"
                    },
                    "secondary": {
                        "base-color": "#000000",
                        "main-color": "#000000",
                        "accent-color": "#000000"
                    }
                };
            }

            resolve(body)
        }
    )
}

async function main() {
    body = await test(color);
    console.log(body);
    response = {};
    response['response'] = body;
    console.log(response);
}

main();
