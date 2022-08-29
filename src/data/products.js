const products = [
  {
    id: "101",
    name: "16pt + Matte Finish",
    categoryId: 1,
    category: "Business card",
    price: 10,
    options: [
      { size: ["3.5x2"] },
      {
        quantity: [
          "100 + $00.00",
          "250 + $00.00",
          "500 + $00.00",
          "2500 + $00.00",
          "5000 + $00.00",
        ],
      },
      { "printed sides": ["full color one side", "full color both sides"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Business cards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
  {
    id: "102",
    name: "16pt + UV(High Gloss)",
    categoryId: 1,
    category: "Business card",
    price: 12,
    options: [
      { size: ["3.5x2"] },
      {
        quantity: [
          "100 + $00.00",
          "250 + $00.00",
          "500 + $00.00",
          "2500 + $00.00",
          "5000 + $00.00",
        ],
      },
      { "printed sides": ["full color one side", "full color both sides"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Business cards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
  {
    id: "103",
    name: "18pt + Silk Lamination",
    categoryId: 1,
    category: "Business card",
    price: 13,
    options: [
      { size: ["3.5x2"] },
      {
        quantity: [
          "100 + $00.00",
          "250 + $00.00",
          "500 + $00.00",
          "2500 + $00.00",
          "5000 + $00.00",
        ],
      },
      { "printed sides": ["full color one side", "full color both sides"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Business cards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
  {
    id: "104",
    name: "Soft Touch",
    categoryId: 1,
    category: "Business card",
    price: 100,
    options: [
      { size: ["3.5x2"] },
      {
        quantity: [
          "100 + $00.00",
          "250 + $00.00",
          "500 + $00.00",
          "2500 + $00.00",
          "5000 + $00.00",
        ],
      },
      { "printed sides": ["full color one side", "full color both sides"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Business cards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
  {
    id: "105",
    name: "Soft UV",
    categoryId: 1,
    category: "Business card",
    price: 100,
    options: [
      { size: ["3.5x2"] },
      {
        quantity: [
          "100 + $00.00",
          "250 + $00.00",
          "500 + $00.00",
          "2500 + $00.00",
          "5000 + $00.00",
        ],
      },
      { "printed sides": ["full color one side", "full color both sides"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Business cards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
  {
    id: "106",
    name: "Metalic Foil (Gold/Sliver)",
    categoryId: 1,
    category: "Business card",
    price: 100,
    options: [
      { size: ["3.5x2"] },
      {
        quantity: [
          "100 + $00.00",
          "250 + $00.00",
          "500 + $00.00",
          "2500 + $00.00",
          "5000 + $00.00",
        ],
      },
      { "printed sides": ["full color one side", "full color both sides"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Business cards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
  {
    id: "107",
    name: "Kraft",
    categoryId: 1,
    category: "Business card",
    price: 100,
    options: [
      { size: ["3.5x2"] },
      {
        quantity: [
          "100 + $00.00",
          "250 + $00.00",
          "500 + $00.00",
          "2500 + $00.00",
          "5000 + $00.00",
        ],
      },
      { "printed sides": ["full color one side", "full color both sides"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Business cards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
  {
    id: "108",
    name: "32pt + Colored Edges",
    categoryId: 1,
    category: "Business card",
    price: 100,
    options: [
      { size: ["3.5x2"] },
      {
        quantity: [
          "100 + $00.00",
          "250 + $00.00",
          "500 + $00.00",
          "2500 + $00.00",
          "5000 + $00.00",
        ],
      },
      { "printed sides": ["full color one side", "full color both sides"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Business cards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },

  {
    id: "201",
    name: "Post Card",
    categoryId: 2,
    category: "Marketing & Stationery",
    price: 100,
    options: [
      { size: ["4 x 6", "5.5 x 8.5", "8.5 x 11"] },
      { "Printed sides": ["full color one side", "full color both sides"] },
      { "Paper Stock": ["14pt Card Stock"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Post cards are widely used as a networking tool and a way to make a good first impression.",
  },
  {
    id: "202",
    name: "Flyers",
    categoryId: 2,
    category: "Marketing & Stationery",
    price: 100,
    options: [
      { size: ["5.5 x 8.5", "8.5 x 11"] },
      { "printed sides": ["full color one side", "full color both sides"] },
      { "Paper Stock": ["100lb gloss", "100lb matt"] },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Post cards are widely used as a networking tool and a way to make a good first impression.",
  },
  {
    id: "203",
    name: "Booklets",
    categoryId: 2,
    category: "Marketing & Stationery",
    price: 100,
    options: [],
    description:
      "Post cards are widely used as a networking tool and a way to make a good first impression.",
  },
  {
    id: "204",
    name: "Poster",
    categoryId: 2,
    category: "Marketing & Stationery",
    price: 100,
    options: [
      { size: ["18 x 24", "24 x 36", "36 x 48"] },
      {
        "Production Turnaround Time": ["1-3 Business Days"],
      },
    ],
    description:
      "Post cards are widely used as a networking tool and a way to make a good first impression.",
  },
  {
    id: "205",
    name: "Envelopes",
    categoryId: 2,
    category: "Marketing & Stationery",
    price: 100,
    options: [
      { color: ["black & white", "other color (write it in the note."] },
      {
        size: ["#10(4-1/8 x 9-1/2)", "#9(3-7/8 x 8-7/8)", "#8(3-5/8 x 6-1/2)"],
      },
    ],
    description:
      "Post cards are widely used as a networking tool and a way to make a good first impression.",
  },

  {
    id: "206",
    name: "Envelopes with window",
    categoryId: 2,
    category: "Marketing & Stationery",
    price: 100,
    options: [
      { color: ["black & white", "other color (write it in the note."] },
      {
        size: ["#10(4-1/8 x 9-1/2)", "#9(3-7/8 x 8-7/8)", "#8(3-5/8 x 6-1/2)"],
      },
    ],
    description:
      "Post cards are widely used as a networking tool and a way to make a good first impression.",
  },
  {
    id: "207",
    name: "Notepads",
    categoryId: 2,
    category: "Marketing & Stationery",
    price: 100,
    options: [
      { size: ["4 x 6", "5.5 x 8.5", "8.5 x 11"] },
      { "printed sides": ["full color one side", "full color both sides"] },
      { "Paper Stock": "14pt Card Stock" },
      {
        "Production Turnaround Time": ["1-5 Business Days"],
      },
    ],
    description:
      "Post cards are widely used as a networking tool and a way to make a good first impression.",
  },
  {
    id: "208",
    name: "NCR Forms",
    categoryId: 2,
    category: "Marketing & Stationery",
    price: 100,
    options: [],
    description:
      "Post cards are widely used as a networking tool and a way to make a good first impression.",
  },
  // {
  //   id: "301",
  //   name: "Stickers",
  //   categoryId: 3,
  //   category: "Lables",
  //   price: 200,
  //   options: [],
  //   description:
  //     "Stickers are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  // },
  {
    id: "401",
    name: "Sandwich Board",
    categoryId: 4,
    category: "Sign",
    price: 200,
    options: [],
    description:
      "Sandwich boards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
  {
    id: "402",
    name: "Formboard",
    categoryId: 4,
    category: "Sign",
    price: 200,
    options: [],
    description:
      "Sandwich boards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
  {
    id: "403",
    name: "Banner",
    categoryId: 4,
    category: "Sign",
    price: 200,
    options: [],
    description:
      "Sandwich boards are widely used as a networking tool and a way to make a good first impression. Our 14pt Profit Maximizing business cards offer the same great quality at a lower price.",
  },
];

export default products;
