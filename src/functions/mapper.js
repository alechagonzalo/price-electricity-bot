const mapperDataAMToDataVM = (data) => {
    return data.map((price) => {
        return { hour: price.Hora, price: price.PCB };
    });
};

module.exports = { mapperDataAMToDataVM };
