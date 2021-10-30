const mapperDataAMToDataVM = (data) => {
    return data.map((price) => {
        return {
            hour: price.Hora,
            price: parseFloat(price.PCB.replace(",", "."))
        };
    });
};

module.exports = { mapperDataAMToDataVM };
