document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.classList.add("mobile-menu-btn");
  mobileMenuBtn.innerHTML = "☰";
  document.querySelector("header .logo").after(mobileMenuBtn);

  const nav = document.querySelector("nav");
  mobileMenuBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  // Risk Assessment functionality
  const assessRiskBtn = document.getElementById("assess-risk-btn");
  const riskResults = document.getElementById("risk-results");
  const countrySelect = document.getElementById("country");
  const regionSelect = document.getElementById("region");

  // Initially hide risk results
  riskResults.classList.add("hidden");

  // Country and region data (sample data)
  const regionData = {
    india: ["Kerala", "Tamil Nadu", "Maharashtra", "Gujarat", "West Bengal"],
    usa: ["California", "Florida", "Texas", "New York", "Colorado"],
    australia: [
      "New South Wales",
      "Queensland",
      "Victoria",
      "Western Australia",
      "Tasmania",
    ],
  };

  // Populate regions based on selected country
  countrySelect.addEventListener("change", function () {
    const country = this.value;
    regionSelect.innerHTML = '<option value="">Select State/Region</option>';

    if (country && regionData[country]) {
      regionData[country].forEach((region) => {
        const option = document.createElement("option");
        option.value = region.toLowerCase().replace(/\s+/g, "-");
        option.textContent = region;
        regionSelect.appendChild(option);
      });
    }
  });

  // Risk assessment data (sample data)
  const riskData = {
    india: {
      kerala: { floods: 80, earthquakes: 30, cyclones: 75, wildfires: 20 },
      "tamil-nadu": {
        floods: 60,
        earthquakes: 20,
        cyclones: 85,
        wildfires: 10,
      },
      maharashtra: { floods: 50, earthquakes: 60, cyclones: 40, wildfires: 30 },
      gujarat: { floods: 40, earthquakes: 70, cyclones: 60, wildfires: 25 },
      "west-bengal": {
        floods: 75,
        earthquakes: 25,
        cyclones: 80,
        wildfires: 15,
      },
    },
    usa: {
      california: { floods: 30, earthquakes: 85, cyclones: 20, wildfires: 90 },
      florida: { floods: 75, earthquakes: 10, cyclones: 90, wildfires: 40 },
      texas: { floods: 60, earthquakes: 30, cyclones: 70, wildfires: 60 },
      "new-york": { floods: 50, earthquakes: 40, cyclones: 60, wildfires: 20 },
      colorado: { floods: 35, earthquakes: 50, cyclones: 10, wildfires: 75 },
    },
    australia: {
      "new-south-wales": {
        floods: 60,
        earthquakes: 30,
        cyclones: 30,
        wildfires: 85,
      },
      queensland: { floods: 70, earthquakes: 20, cyclones: 80, wildfires: 60 },
      victoria: { floods: 50, earthquakes: 40, cyclones: 20, wildfires: 90 },
      "western-australia": {
        floods: 40,
        earthquakes: 60,
        cyclones: 70,
        wildfires: 65,
      },
      tasmania: { floods: 55, earthquakes: 25, cyclones: 40, wildfires: 70 },
    },
  };

  // Generate risk assessment
  assessRiskBtn.addEventListener("click", function () {
    const country = countrySelect.value;
    const region = regionSelect.value;

    if (!country || !region) {
      alert("Please select both country and region");
      return;
    }

    const risks = riskData[country][region];
    if (!risks) {
      alert("No risk data available for the selected region");
      return;
    }

    // Update risk bars
    updateRiskBars(risks);

    // Update recommendations based on highest risks
    updateRecommendations(risks, region);

    // Show results with animation
    riskResults.classList.remove("hidden");
    riskResults.classList.add("visible");

    // Scroll to results
    riskResults.scrollIntoView({ behavior: "smooth" });
  });

  function updateRiskBars(risks) {
    // Reset all risk levels first
    document.querySelectorAll(".risk-level").forEach((el) => {
      el.style.width = "0%";
    });

    // Set timeouts to animate the bars
    setTimeout(() => {
      document.querySelector(".risk-bar:nth-child(1) .risk-level").style.width =
        risks.floods + "%";
      document.querySelector(
        ".risk-bar:nth-child(1) .risk-percentage"
      ).textContent = risks.floods + "%";
    }, 100);

    setTimeout(() => {
      document.querySelector(".risk-bar:nth-child(2) .risk-level").style.width =
        risks.earthquakes + "%";
      document.querySelector(
        ".risk-bar:nth-child(2) .risk-percentage"
      ).textContent = risks.earthquakes + "%";
    }, 300);

    setTimeout(() => {
      document.querySelector(".risk-bar:nth-child(3) .risk-level").style.width =
        risks.cyclones + "%";
      document.querySelector(
        ".risk-bar:nth-child(3) .risk-percentage"
      ).textContent = risks.cyclones + "%";
    }, 500);

    setTimeout(() => {
      document.querySelector(".risk-bar:nth-child(4) .risk-level").style.width =
        risks.wildfires + "%";
      document.querySelector(
        ".risk-bar:nth-child(4) .risk-percentage"
      ).textContent = risks.wildfires + "%";
    }, 700);

    // Update risk level classes
    document.querySelectorAll(".risk-level").forEach((el) => {
      const percentage = parseInt(el.style.width);
      el.className = "risk-level";
      if (percentage >= 70) {
        el.classList.add("high");
      } else if (percentage >= 40) {
        el.classList.add("medium");
      } else {
        el.classList.add("low");
      }
    });
  }

  function updateRecommendations(risks, region) {
    const recommendationsList = document.querySelector(
      ".risk-recommendations ul"
    );
    recommendationsList.innerHTML = "";

    // Sort risks from highest to lowest
    const sortedRisks = Object.entries(risks).sort((a, b) => b[1] - a[1]);

    // Create recommendations based on the highest risks
    if (sortedRisks[0][1] >= 70) {
      addRecommendation(
        `Prepare for <strong>${sortedRisks[0][0]}</strong> as your highest priority`
      );
    }

    if (sortedRisks[0][0] === "floods") {
      addRecommendation("Elevate electrical systems and prepare sandbags");
      addRecommendation("Have waterproof containers for important documents");
    } else if (sortedRisks[0][0] === "earthquakes") {
      addRecommendation("Secure heavy furniture and fixtures to walls");
      addRecommendation(
        'Practice "drop, cover, and hold on" drills with family'
      );
    } else if (sortedRisks[0][0] === "cyclones") {
      addRecommendation("Reinforce windows and doors before storm season");
      addRecommendation("Identify a safe room in your home away from windows");
    } else if (sortedRisks[0][0] === "wildfires") {
      addRecommendation("Create a defensible space around your property");
      addRecommendation("Have a go-bag ready with respirator masks");
    }

    // Add a recommendation for the second highest risk if it's significant
    if (sortedRisks[1][1] >= 40) {
      addRecommendation(
        `Also prepare for moderate ${sortedRisks[1][0]} risk in your area`
      );
    }

    function addRecommendation(text) {
      const li = document.createElement("li");
      li.innerHTML = text;
      recommendationsList.appendChild(li);
    }
  }

  // Checklist tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and content
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      document
        .querySelectorAll(".checklist-content")
        .forEach((content) => content.classList.remove("active"));

      // Add active class to current button and corresponding content
      this.classList.add("active");
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Generate Checklist functionality
  const generateChecklistBtn = document.getElementById(
    "generate-checklist-btn"
  );
  generateChecklistBtn.addEventListener("click", function () {
    // Get selected disaster types
    const selectedDisasters = Array.from(
      document.querySelectorAll('input[name="disaster"]:checked')
    ).map((el) => el.value);

    if (selectedDisasters.length === 0) {
      alert("Please select at least one disaster type");
      return;
    }

    // Get household size
    const householdSize = document.querySelector(
      '.form-group input[type="number"]'
    ).value;

    // Check if includes children and pets
    const includesChildren = document.querySelector(
      '.form-group:nth-of-type(3) input[type="checkbox"]'
    ).checked;
    const includesPets = document.querySelector(
      '.form-group:nth-of-type(4) input[type="checkbox"]'
    ).checked;

    // Generate checklists for each category
    generateEssentialsChecklist(
      selectedDisasters,
      householdSize,
      includesChildren,
      includesPets
    );
    generateFoodChecklist(householdSize, includesChildren, includesPets);
    generateMedicalChecklist(includesChildren, includesPets);
    generateDocumentsChecklist(includesChildren, includesPets);

    // Show the checklist results tab
    document
      .querySelector(".checklist-results")
      .scrollIntoView({ behavior: "smooth" });
  });

  function generateEssentialsChecklist(disasters, size, hasChildren, hasPets) {
    const essentialsList = document.getElementById("essentials");
    essentialsList.innerHTML = "";

    // Basic items for everyone
    addChecklistItem(essentialsList, `Flashlight (${size} per person)`);
    addChecklistItem(essentialsList, "Extra batteries");
    addChecklistItem(essentialsList, "First aid kit");
    addChecklistItem(essentialsList, `Emergency blanket (${size})`);
    addChecklistItem(essentialsList, "Multi-tool or Swiss Army knife");
    addChecklistItem(essentialsList, "Whistle");
    addChecklistItem(essentialsList, `Dust masks (${size})`);
    addChecklistItem(essentialsList, "Phone charger & portable battery");

    // Items for specific disasters
    if (disasters.includes("flood")) {
      addChecklistItem(essentialsList, "Waterproof boots");
      addChecklistItem(essentialsList, "Life jackets");
      addChecklistItem(essentialsList, "Plastic sheeting");
    }

    if (disasters.includes("cyclone")) {
      addChecklistItem(essentialsList, "Weather radio");
      addChecklistItem(essentialsList, "Duct tape");
      addChecklistItem(essentialsList, "Plastic tarps");
    }

    if (disasters.includes("earthquake")) {
      addChecklistItem(essentialsList, "Work gloves");
      addChecklistItem(essentialsList, "Emergency tent");
      addChecklistItem(essentialsList, "Wrench for utilities");
    }

    if (disasters.includes("wildfire")) {
      addChecklistItem(essentialsList, "N95 respirator masks");
      addChecklistItem(essentialsList, "Goggles");
      addChecklistItem(essentialsList, "Fire extinguisher");
    }

    // Items for children
    if (hasChildren) {
      addChecklistItem(essentialsList, "Children's activities/games");
      addChecklistItem(essentialsList, "Comfort items/stuffed animals");
    }

    // Items for pets
    if (hasPets) {
      addChecklistItem(essentialsList, "Pet carrier");
      addChecklistItem(essentialsList, "Pet leash and collar with ID");
      addChecklistItem(essentialsList, "Pet comfort items");
    }
  }

  function generateFoodChecklist(size, hasChildren, hasPets) {
    const foodList = document.getElementById("food");
    foodList.innerHTML = "";

    // Calculate water needs (1 gallon per person per day for 3 days)
    const waterGallons = size * 3;

    addChecklistItem(
      foodList,
      `Water (${waterGallons} gallons, 1 gallon per person per day)`
    );
    addChecklistItem(foodList, "Non-perishable food (3-day supply)");
    addChecklistItem(foodList, "Manual can opener");
    addChecklistItem(foodList, "Mess kits, paper cups, plates, utensils");
    addChecklistItem(foodList, "Food storage containers");
    addChecklistItem(foodList, "Camp stove or portable cooking device");
    addChecklistItem(foodList, "Water purification tablets or filter");

    // Items for children
    if (hasChildren) {
      addChecklistItem(foodList, "Formula/baby food if needed");
      addChecklistItem(foodList, "Children's favorite non-perishable snacks");
    }

    // Items for pets
    if (hasPets) {
      addChecklistItem(foodList, "Pet food (3-day supply)");
      addChecklistItem(foodList, "Pet water bowls");
      addChecklistItem(foodList, "Manual pet food can opener if needed");
    }
  }

  function generateMedicalChecklist(hasChildren, hasPets) {
    const medicalList = document.getElementById("medical");
    medicalList.innerHTML = "";

    addChecklistItem(medicalList, "First aid manual");
    addChecklistItem(medicalList, "Prescription medications (7-day supply)");
    addChecklistItem(medicalList, "Pain relievers");
    addChecklistItem(medicalList, "Antihistamines for allergic reactions");
    addChecklistItem(medicalList, "Antidiarrheal medication");
    addChecklistItem(medicalList, "Antiseptic wipes");
    addChecklistItem(medicalList, "Bandages in various sizes");
    addChecklistItem(medicalList, "Sterile gauze pads");
    addChecklistItem(medicalList, "Medical tape");
    addChecklistItem(medicalList, "Scissors and tweezers");
    addChecklistItem(medicalList, "Thermometer");
    addChecklistItem(medicalList, "Hand sanitizer");

    // Items for children
    if (hasChildren) {
      addChecklistItem(medicalList, "Children's medications");
      addChecklistItem(medicalList, "Pediatric electrolyte solution");
      addChecklistItem(medicalList, "Children's first aid supplies");
    }

    // Items for pets
    if (hasPets) {
      addChecklistItem(medicalList, "Pet medications");
      addChecklistItem(medicalList, "Pet first aid items");
      addChecklistItem(medicalList, "Pet medical records");
    }
  }

  function generateDocumentsChecklist(hasChildren, hasPets) {
    const documentsList = document.getElementById("documents");
    documentsList.innerHTML = "";

    addChecklistItem(
      documentsList,
      "Identification (driver's license, passport)"
    );
    addChecklistItem(documentsList, "Insurance policies");
    addChecklistItem(documentsList, "Property deeds, leases");
    addChecklistItem(documentsList, "Birth certificates");
    addChecklistItem(documentsList, "Medical information/prescriptions");
    addChecklistItem(documentsList, "Bank account records");
    addChecklistItem(documentsList, "Emergency contact list");
    addChecklistItem(documentsList, "Cash in small denominations");
    addChecklistItem(documentsList, "Map of local area");
    addChecklistItem(documentsList, "USB drive with important documents");
    addChecklistItem(documentsList, "Waterproof document container");

    // Items for children
    if (hasChildren) {
      addChecklistItem(documentsList, "Children's birth certificates");
      addChecklistItem(documentsList, "School records");
      addChecklistItem(documentsList, "Immunization records");
    }

    // Items for pets
    if (hasPets) {
      addChecklistItem(documentsList, "Pet vaccination records");
      addChecklistItem(documentsList, "Pet registration/microchip information");
      addChecklistItem(documentsList, "Pet photos (in case of separation)");
    }
  }

  function addChecklistItem(list, text) {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="checkbox"> ${text}</label>`;
    list.appendChild(li);
  }

  // Get Started button scroll to risk assessment
  document
    .getElementById("get-started-btn")
    .addEventListener("click", function () {
      document
        .getElementById("risk-assessment")
        .scrollIntoView({ behavior: "smooth" });
    });

  // Download buttons functionality
  document.querySelectorAll(".download-options .btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      alert(
        "This feature will allow you to download, print, or save your checklist. Implementation would require backend functionality."
      );
    });
  });

  // Add smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile menu if open
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
      }

      // Update active nav link
      document.querySelectorAll("nav a").forEach((navLink) => {
        navLink.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  // Add HTML for missing sections (Evacuation Plan and Learn sections)
  addEvacuationSection();
  addLearnSection();

  function addEvacuationSection() {
    const evacuationSection = document.createElement("section");
    evacuationSection.id = "evacuation";
    evacuationSection.className = "evacuation";

    evacuationSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">Create Your Evacuation Plan</h2>
                <div class="evacuation-plan">
                    <div class="evacuation-form">
                        <h3>Your Information</h3>
                        <div class="form-group">
                            <label for="home-address">Home Address</label>
                            <input type="text" id="home-address" placeholder="Enter your home address">
                        </div>
                        <div class="form-group">
                            <label for="evac-destination">Evacuation Destination</label>
                            <input type="text" id="evac-destination" placeholder="Enter evacuation destination">
                        </div>
                        <div class="form-group">
                            <label for="trans-mode">Transportation Mode</label>
                            <select id="trans-mode">
                                <option value="">Select Transportation</option>
                                <option value="car">Personal Vehicle</option>
                                <option value="public">Public Transportation</option>
                                <option value="walking">Walking</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Family Meeting Point</label>
                            <input type="text" placeholder="Enter a meeting point if separated">
                        </div>
                        <button class="btn primary" id="create-evac-plan">Create Evacuation Plan</button>
                        
                        <div class="route-details" id="route-details" style="display: none;">
                            <h4>Your Evacuation Route</h4>
                            <p>Primary Route: <span id="primary-route">Main Street → Highway 1 → Evacuation Center</span></p>
                            <p>Alternative Route: <span id="alt-route">Side Street → Route 9 → Evacuation Center</span></p>
                            <p>Estimated Travel Time: <span id="travel-time">25 minutes</span></p>
                            <p>Distance: <span id="distance">12 miles</span></p>
                        </div>
                    </div>
                    <div class="evacuation-map">
                        <h3>Evacuation Map</h3>
                        <div class="map-placeholder" id="evacuation-map">
                            <p>Map will appear here after generating plan</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Insert before the CTA section
    document.querySelector(".cta").before(evacuationSection);

    // Add event listener for evacuation plan button
    document
      .getElementById("create-evac-plan")
      .addEventListener("click", function () {
        const homeAddress = document.getElementById("home-address").value;
        const evacDestination =
          document.getElementById("evac-destination").value;
        const transMode = document.getElementById("trans-mode").value;

        if (!homeAddress || !evacDestination || !transMode) {
          alert("Please fill in all evacuation plan fields");
          return;
        }

        // Show route details
        document.getElementById("route-details").style.display = "block";

        // Update map placeholder with simulated route
        const mapPlaceholder = document.getElementById("evacuation-map");
        mapPlaceholder.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-weight: bold; margin-bottom: 10px;">Evacuation Route Map</div>
                    <div style="background-color: #dbeafe; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 5px;">
                        <div style="width: 20px; height: 20px; background-color: #3b82f6; border-radius: 50%; margin-right: 10px;"></div>
                        <div style="flex-grow: 1; height: 3px; background-color: #3b82f6;"></div>
                        <div style="width: 20px; height: 20px; background-color: #ef4444; border-radius: 50%;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                        <div>Start: ${homeAddress}</div>
                        <div>End: ${evacDestination}</div>
                    </div>
                </div>
            `;
      });
  }

  function addLearnSection() {
    const learnSection = document.createElement("section");
    learnSection.id = "learn";
    learnSection.className = "learn";

    learnSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">Learn Disaster Response</h2>
                <div class="disaster-cards">
                    <div class="disaster-card">
                        <div class="disaster-card-image">
                            <img src="/api/placeholder/250/150" alt="Flood response">
                        </div>
                        <div class="disaster-card-content">
                            <h3>Flood Response</h3>
                            <p>Learn how to stay safe before, during, and after a flood emergency.</p>
                            <button class="btn primary view-disaster-info" data-disaster="flood">View Response Card</button>
                        </div>
                    </div>
                    <div class="disaster-card">
                        <div class="disaster-card-image">
                            <img src="/api/placeholder/250/150" alt="Earthquake response">
                        </div>
                        <div class="disaster-card-content">
                            <h3>Earthquake Response</h3>
                            <p>Learn the right actions to take when an earthquake strikes.</p>
                            <button class="btn primary view-disaster-info" data-disaster="earthquake">View Response Card</button>
                        </div>
                    </div>
                    <div class="disaster-card">
                        <div class="disaster-card-image">
                            <img src="/api/placeholder/250/150" alt="Cyclone response">
                        </div>
                        <div class="disaster-card-content">
                            <h3>Cyclone/Hurricane Response</h3>
                            <p>Prepare for and respond to cyclones and hurricanes effectively.</p>
                            <button class="btn primary view-disaster-info" data-disaster="cyclone">View Response Card</button>
                        </div>
                    </div>
                    <div class="disaster-card">
                        <div class="disaster-card-image">
                            <img src="/api/placeholder/250/150" alt="Wildfire response">
                        </div>
                        <div class="disaster-card-content">
                            <h3>Wildfire Response</h3>
                            <p>Learn how to prepare for and evacuate during wildfire emergencies.</p>
                            <button class="btn primary view-disaster-info" data-disaster="wildfire">View Response Card</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Response Card Modal -->
            <div id="response-card-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div id="disaster-response-content"></div>
                </div>
            </div>
        `;

    // Insert before the CTA section
    document.querySelector(".cta").before(learnSection);

    // Create modal styles
    const modalStyles = document.createElement("style");
    modalStyles.textContent = `
            .modal {
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.7);
            }
            
            .modal-content {
                background-color: var(--white);
                margin: 10% auto;
                padding: 20px;
                border-radius: 8px;
                width: 80%;
                max-width: 700px;
                position: relative;
                animation: modalFadeIn 0.4s;
            }
            
            @keyframes modalFadeIn {
                from {opacity: 0; transform: translateY(-50px);}
                to {opacity: 1; transform: translateY(0);}
            }
            
            .close-modal {
                position: absolute;
                right: 20px;
                top: 10px;
                color: var(--gray);
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .close-modal:hover {
                color: var(--dark);
            }
            
            .response-card {
                padding: 20px 0;
            }
            
            .response-card h2 {
                color: var(--primary);
                margin-bottom: 20px;
                text-align: center;
            }
            
            .response-phases {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            
            .response-phase {
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 15px;
            }
            
            .response-phase h3 {
                color: var(--dark);
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .phase-steps {
                padding-left: 20px;
            }
            
            .phase-steps li {
                margin-bottom: 8px;
                position: relative;
                list-style-type: none;
            }
            
            .phase-steps li:before {
                content: "▶";
                color: var(--primary);
                position: absolute;
                left: -20px;
                font-size: 12px;
            }
        `;
    document.head.appendChild(modalStyles);

    // Add event listeners for disaster info buttons
    document.querySelectorAll(".view-disaster-info").forEach((button) => {
      button.addEventListener("click", function () {
        const disasterType = this.getAttribute("data-disaster");
        showDisasterResponseCard(disasterType);
      });
    });

    // Close modal functionality
    document
      .querySelector(".close-modal")
      .addEventListener("click", function () {
        document.getElementById("response-card-modal").style.display = "none";
      });

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
      const modal = document.getElementById("response-card-modal");
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    // Disaster response content
    const disasterResponseData = {
      flood: {
        title: "Flood Response Guide",
        description:
          "Floods can develop slowly or happen quickly without warning. Know what to do before, during, and after a flood to protect yourself and your family.",
        before: [
          "Know your area's flood risk and evacuation routes",
          "Prepare an emergency kit and family communication plan",
          "Elevate electrical systems and protect critical documents in waterproof containers",
          "Consider flood insurance even if not in a high-risk zone",
          "Monitor weather forecasts and flood warnings",
        ],
        during: [
          "Evacuate immediately if ordered or if you see rising water",
          "Never walk, swim, or drive through flood waters",
          "Stay off bridges over fast-moving water",
          "Move to higher ground or upper floors",
          "Disconnect utilities if safe to do so",
        ],
        after: [
          "Return home only when authorities say it's safe",
          "Document damage with photos for insurance claims",
          "Clean and disinfect everything that got wet",
          "Be cautious of electrocution risks - check with an electrician",
          "Watch for hazards like damaged roads and contaminated water",
        ],
      },
      earthquake: {
        title: "Earthquake Response Guide",
        description:
          "Earthquakes strike without warning. Knowing how to respond quickly and properly can save lives.",
        before: [
          "Secure heavy furniture, appliances, and hanging objects",
          "Create a family emergency communication plan",
          "Know where and how to shut off utilities",
          "Store critical supplies and documents in accessible places",
          "Practice 'Drop, Cover, and Hold On' with family members",
        ],
        during: [
          "DROP to the ground before the earthquake drops you",
          "COVER your head and neck with your arms; crawl under sturdy furniture if possible",
          "HOLD ON to shelter until the shaking stops",
          "If in bed, stay there and cover your head with a pillow",
          "If outdoors, move to a clear area away from buildings and power lines",
        ],
        after: [
          "Expect aftershocks and be ready to 'Drop, Cover, and Hold On' again",
          "Check yourself and others for injuries",
          "Evacuate if you smell gas or see structural damage",
          "Monitor news reports from reliable sources",
          "Use text messages rather than phone calls to communicate",
        ],
      },
      cyclone: {
        title: "Cyclone/Hurricane Response Guide",
        description:
          "Tropical cyclones, hurricanes, and typhoons bring powerful winds, heavy rainfall, and storm surges. Proper preparation and response is essential.",
        before: [
          "Know your evacuation zone and route",
          "Prepare an emergency kit for at least 3 days",
          "Secure or bring inside outdoor objects that could become projectiles",
          "Install storm shutters or board up windows with plywood",
          "Fill clean containers with drinking water and bathtubs with water for sanitation",
        ],
        during: [
          "Stay inside away from windows, skylights, and glass doors",
          "Take refuge in a small interior room, closet, or hallway",
          "If flooding threatens, turn off electricity at the main breaker",
          "Monitor emergency broadcasts on a battery-powered radio",
          "Do not go outside during the 'eye' of the storm - winds will rapidly increase again",
        ],
        after: [
          "Remain indoors until officials declare it's safe to exit",
          "Avoid downed power lines and flooded areas",
          "Document property damage with photographs",
          "Use stored water for drinking and sanitation until safety is confirmed",
          "Check on neighbors, especially elderly or those with special needs",
        ],
      },
      wildfire: {
        title: "Wildfire Response Guide",
        description:
          "Wildfires can spread rapidly and unpredictably. Understanding how to prevent and respond to wildfires can protect your home and family.",
        before: [
          "Create defensible space around your home by clearing vegetation",
          "Use fire-resistant materials and design for home construction/renovation",
          "Keep emergency supplies in a 'go bag' ready for quick evacuation",
          "Plan and practice multiple evacuation routes",
          "Sign up for emergency alerts in your area",
        ],
        during: [
          "Evacuate immediately when authorities order it",
          "If trapped, call 911 and identify your location",
          "Wear respirator masks rated N95 or P100 to protect from smoke",
          "Close all windows, vents, and doors to prevent embers from entering",
          "Turn on lights to make your house visible in heavy smoke",
        ],
        after: [
          "Return only when authorities say it's safe",
          "Watch for hot spots and smoldering embers around your property",
          "Use caution when entering burned areas - hazards may remain",
          "Document damage with photos for insurance claims",
          "Monitor air quality and continue wearing masks if necessary",
        ],
      },
    };

    function showDisasterResponseCard(disasterType) {
      const data = disasterResponseData[disasterType];
      if (!data) return;

      const content = document.getElementById("disaster-response-content");
      content.innerHTML = `
                <div class="response-card">
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                    
                    <div class="response-phases">
                        <div class="response-phase">
                            <h3>Before</h3>
                            <ul class="phase-steps">
                                ${data.before
                                  .map((step) => `<li>${step}</li>`)
                                  .join("")}
                            </ul>
                        </div>
                        <div class="response-phase">
                            <h3>During</h3>
                            <ul class="phase-steps">
                                ${data.during
                                  .map((step) => `<li>${step}</li>`)
                                  .join("")}
                            </ul>
                        </div>
                        <div class="response-phase">
                            <h3>After</h3>
                            <ul class="phase-steps">
                                ${data.after
                                  .map((step) => `<li>${step}</li>`)
                                  .join("")}
                            </ul>
                        </div>
                    </div>
                </div>
            `;

      document.getElementById("response-card-modal").style.display = "block";
    }
  }
});
